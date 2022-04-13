import type { GetStaticPaths, GetStaticProps } from 'next'
import { api } from '../../services/api'
import { ProductTemplate } from '../../templates/ProductTemplate'
import { Product as ProductType } from '../../types/game'

type ProductProps = {
  product: ProductType
}

const Product = (props: ProductProps) => {
  const { product } = props

  return <ProductTemplate product={product}></ProductTemplate>
}

export default Product

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get<ProductType[]>('/products')

  const paths = data.map(({ id }: ProductType) => ({
    params: { id: String(id) }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id

  const { data } = await api.get<ProductType>(`/products/${id}`)

  return {
    props: {
      product: data
    } // will be passed to the page component as props
  }
}
