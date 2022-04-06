// Vendors

// Components
import {
  AspectRatio,
  Box,
  Heading,
  Skeleton,
  Text,
  VStack
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { Game } from '../../types/game'
import { Button } from '../Button'

// Types
export type GameSlideProps = {
  game: Game
}

/*
|-----------------------------------------------------------------------------
| Component
|-----------------------------------------------------------------------------
|
|
*/

export const GameSlide = (props: GameSlideProps) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const { game } = props

  const { titulo, imagem, descricao, id } = game

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
    <Link href={`/products/${id}`} passHref>
      <AspectRatio
        w="100%"
        ratio={{ base: 9 / 16, lg: 16 / 9 }}
        cursor="pointer"
      >
        <Box w="100%" h="100%" position="relative">
          <Skeleton
            w="100%"
            h="100%"
            startColor="gray.800"
            endColor="gray.900"
            fadeDuration={0.6}
          />
          <Box
            as="figure"
            sx={{
              img: {
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }
            }}
          >
            <Image src={imagem[0]} layout="fill" alt={`${titulo} thumbnail`} />
          </Box>

          <VStack
            backgroundColor="#000000B3"
            position="absolute"
            bottom={0}
            w="100%"
            h="30%"
            p={{ base: 2, lg: 8 }}
            alignItems="flex-start"
          >
            <Heading as="h2" fontSize={{ base: 24, lg: 28 }}>
              {titulo}
            </Heading>
            <Text fontSize={{ base: 14, lg: 20 }}>{descricao}</Text>

            <Button label="Buy now" onClick={() => console.log('oi')}></Button>
          </VStack>
        </Box>
      </AspectRatio>
    </Link>
  )
}
