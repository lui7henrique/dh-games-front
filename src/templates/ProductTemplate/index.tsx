import { Limiter } from '../../components/Limiter'
import { ProductBanner } from '../../components/ProductBanner'
import { Product } from '../../types/game'
import { CardProduct } from '../../components/CardProduct'

type ProductTemplateProps = {
  product: Product
}

export const ProductTemplate = (props: ProductTemplateProps) => {
  const { product } = props

  const { id, title, description, images, price } = product

  return (
    <>
      <ProductBanner image={images[0]} />

      <Limiter h="100vh" mt="60vh">
        {product && (
          <CardProduct
            id={id}
            title={title}
            description={description}
            price={price}
          />
        )}
      </Limiter>
    </>
  )
}
