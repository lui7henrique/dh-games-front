import type { GetStaticProps } from 'next'
import { Limiter } from '../../components/Limiter'
import { api } from '../../services/api'
import { Game } from '../../types/game'
import { ProductsList } from '../../components/ProductsList'

type ProductsProps = {
  products: Game[]
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
  const { data } = await api.get<Game[]>('/products')

  return {
    props: {
      products: data
    } // will be passed to the page component as props
  }
}
