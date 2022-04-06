import { Limiter } from '../../components/Limiter'
import { ProductBanner } from '../../components/ProductBanner'
import { Game } from '../../types/game'

type ProductTemplateProps = {
  product: Game
}

export const ProductTemplate = (props: ProductTemplateProps) => {
  const { product } = props

  const { titulo, categoria, imagem, preco } = product

  return (
    <>
      <ProductBanner image={imagem[0]} />

      <Limiter h="100vh">
        {product && (
          <>
            <h1>{titulo}</h1>
            <p>{categoria}</p>
            <p>{preco}</p>
          </>
        )}
      </Limiter>
    </>
  )
}
