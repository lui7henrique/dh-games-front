import type { GetStaticProps, NextPage } from 'next'
import { Limiter } from '../components/Limiter'
import { ProductsList } from '../components/ProductsList'
import { ProductsSlider } from '../components/ProductsSlider'
import { api } from '../services/api'
import { Product } from '../types/product'

type HomeProps = {
  products: Product[]
} & NextPage

const Home = (props: HomeProps) => {
  const { products } = props

  return (
    <>
      <ProductsSlider products={products.slice(0, 3)} />
      <Limiter mt={8}>
        <ProductsList title="Recentes" products={products.slice(3, 6)} />
      </Limiter>
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
