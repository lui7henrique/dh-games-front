import { Product } from '../../types/game'
import { ProductsTemplate } from '../../templates/ProductsTemplate'

type ProductsProps = {
  products: Product[]
}

const Products = (props: ProductsProps) => {
  return (
    <>
      <ProductsTemplate />
    </>
  )
}

export default Products
