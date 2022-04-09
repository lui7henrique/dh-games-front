import type { GetStaticProps, NextPage } from 'next'
import { ProductsSlider } from '../components/ProductsSlider'
import { api } from '../services/api'
import { Game, Product } from '../types/game'
// import { useSeed } from '../hooks/useSeed'

type HomeProps = {
  products: Product[]
} & NextPage

const Home = (props: HomeProps) => {
  const { products } = props

  return (
    <>
      <ProductsSlider products={products} />
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await api.get<Product>('/products')

  return {
    props: {
      products: data
    } // will be passed to the page component as props
  }
}
