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

  const { titulo, imagem, descricao } = game

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
    <AspectRatio w="100%" ratio={16 / 9}>
      <Box w="100%" h="100%" position="relative">
        <Skeleton
          w="100%"
          h="100%"
          startColor="gray.800"
          endColor="gray.900"
          fadeDuration={0.6}
        />
        <Image src={imagem[0]} layout="fill" alt={`${titulo} thumbnail`} />

        <VStack
          backgroundColor="#000000B3"
          position="absolute"
          bottom={0}
          w="100%"
          h="30%"
          p={8}
          alignItems="flex-start"
        >
          <Heading as="h2" fontSize={28}>
            {titulo}
          </Heading>
          <Text fontSize={20}>{descricao}</Text>

          <Button label="Buy now" onClick={() => console.log('oi')}></Button>
        </VStack>
      </Box>
    </AspectRatio>
  )
}
