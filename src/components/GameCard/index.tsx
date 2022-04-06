// Vendors

// Components
import {
  AspectRatio,
  Badge,
  Box,
  chakra,
  Heading,
  Skeleton,
  Text
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { Game } from '../../types/game'

// Types
export type GameCardProps = {
  game: Game
}

/*
|-----------------------------------------------------------------------------
| Component
|-----------------------------------------------------------------------------
|
|
*/

const ChakraNextImage = chakra(Image)

export const GameCard = (props: GameCardProps) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const { game } = props

  const { titulo, categoria, imagem, preco, id } = game

  /*
  |-----------------------------------------------------------------------------
  | States
  |-----------------------------------------------------------------------------
  |
  |
  */

  /*
  |-----------------------------------------------------------------------------
  | Functions
  |-----------------------------------------------------------------------------
  |
  |
  */

  /*
  |-----------------------------------------------------------------------------
  | Effects
  |-----------------------------------------------------------------------------
  |
  |
  */

  /*
  |-----------------------------------------------------------------------------
  | Memos
  |-----------------------------------------------------------------------------
  |
  |
  */

  /*
  |-----------------------------------------------------------------------------
  | Renders
  |-----------------------------------------------------------------------------
  |
  |
  */
  return (
    // TODO: TROCAR PARA SLUG
    <Link href={`/products/${id}`} passHref>
      <Box as="a" w="100%" h="auto" className="game-card">
        <AspectRatio
          W="100%"
          ratio={16 / 9}
          position="relative"
          _hover={{
            img: {
              transform: 'scale(1.1)'
            }
          }}
        >
          <Box w="100%">
            {/* TODO: REMOVER E COLOCAR IMAGEM DO NEXT */}
            <Skeleton
              w="100%"
              h="100%"
              startColor="gray.800"
              endColor="gray.900"
              fadeDuration={0.6}
            />
            <ChakraNextImage
              src={imagem[0]}
              alt="oi"
              layout="fill"
              transition="all 0.2s"
            />
          </Box>
        </AspectRatio>

        <Box p={4}>
          <Heading fontSize={16}>{titulo}</Heading>
          <Text>{categoria}</Text>

          <Badge color="gray.50" bgColor="primary.500" px="12px">
            {preco.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL'
            })}
          </Badge>
        </Box>
      </Box>
    </Link>
  )
}
