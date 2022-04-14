import { Product } from '../../types/product'
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
