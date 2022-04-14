import { Limiter } from '../../components/Limiter'
import { ProductBanner } from '../../components/ProductBanner'
import { Product } from '../../types/product'
import { CardProduct } from '../../components/CardProduct'
import { VStack } from '@chakra-ui/react'
import { ProductsList } from '../../components/ProductsList'

type ProductTemplateProps = {
  product: Product
  moreProducts: Product[]
}

export const ProductTemplate = (props: ProductTemplateProps) => {
  const { product, moreProducts } = props

  const { id, title, description, images, price } = product

  return (
    <>
      <ProductBanner image={images[0]} />

      <Limiter h="100vh" mt="60vh">
        <VStack spacing={8} w="100%" alignItems="flex-start">
          {product && (
            <CardProduct
              id={id}
              title={title}
              description={description}
              price={price}
            />
          )}

          {moreProducts && (
            <ProductsList
              products={moreProducts}
              title="Outros produtos"
              w="100%"
            />
          )}
        </VStack>
      </Limiter>
    </>
  )
}
