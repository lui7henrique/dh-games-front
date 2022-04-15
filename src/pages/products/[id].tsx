import type { GetStaticPaths, GetStaticProps } from 'next'
import { api } from '../../services/api'
import { ProductTemplate } from '../../templates/ProductTemplate'
import { Product as ProductType } from '../../types/product'

type ProductProps = {
  product: ProductType
  moreProducts: ProductType[]
}

const Product = (props: ProductProps) => {
  const { product, moreProducts } = props

  return <ProductTemplate product={product} moreProducts={moreProducts} />
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

  const { data: product } = await api.get<ProductType>(`/products/${id}`)

  const { data: moreData } = await api.get<ProductType[]>('products')
  const moreProducts = moreData
    .filter((product) => +product.id !== Number(id))
    .slice(0, 6)

  return {
    props: {
      product,
      moreProducts
    } // will be passed to the page component as props
  }
}
