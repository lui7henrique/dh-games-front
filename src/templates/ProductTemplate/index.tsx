import { Limiter } from '../../components/Limiter'
import { ProductBanner } from '../../components/ProductBanner'
import { Game } from '../../types/game'
import { CardProduct } from '../../components/CardProduct'

type ProductTemplateProps = {
  product: Game
}

export const ProductTemplate = (props: ProductTemplateProps) => {
  const { product } = props

  const { titles, descriptions, images, prices } = product

  return (
    <>
      <ProductBanner image={images[0]} />

      <Limiter h="100vh">
        {product && (
          <CardProduct
            titulo={titles}
            descricao={descriptions}
            preco={prices}
          />
        )}
      </Limiter>
    </>
  )
}
