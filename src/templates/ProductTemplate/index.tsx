import { Limiter } from '../../components/Limiter'
import { ProductBanner } from '../../components/ProductBanner'
import { Game } from '../../types/game'
import { CardProduct } from '../../components/CardProduct'

type ProductTemplateProps = {
  product: Game
}

export const ProductTemplate = (props: ProductTemplateProps) => {
  const { product } = props

  const { titulo, descricao, imagem, preco } = product

  return (
    <>
      <ProductBanner image={imagem[0]} />

      <Limiter h="100vh">
        {product && (
          <CardProduct titulo={titulo} descricao={descricao} preco={preco} />
        )}
      </Limiter>
    </>
  )
}
