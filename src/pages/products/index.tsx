import type { GetStaticProps } from 'next'
import { Limiter } from '../../components/Limiter'
import { api } from '../../services/api'
import { Product } from '../../types/game'
import { ProductsList } from '../../components/ProductsList'

type ProductsProps = {
  products: Product[]
}

const Products = (props: ProductsProps) => {
  const { products } = props

  return (
    <>
      <Limiter>
        <ProductsList products={products} />
      </Limiter>
    </>
  )
}

export default Products

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await api.get<Product[]>('/products')

  console.log(data)

  return {
    props: {
      products: data
    } // will be passed to the page component as props
  }
}
