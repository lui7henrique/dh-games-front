// Vendors
import Image from 'next/image'
import Link from 'next/link'

// Components
import {
  AspectRatio,
  Badge,
  Box,
  chakra,
  Heading,
  IconButton,
  Skeleton,
  Text
} from '@chakra-ui/react'
import { HiPencil } from 'react-icons/hi'

import { Product } from '../../types/game'
import { useCallback } from 'react'

// Types
export type ProductCardProps = {
  product: Product
  isEditMode?: boolean
}

/*
|-----------------------------------------------------------------------------
| Component
|-----------------------------------------------------------------------------
|
|
*/

const ChakraNextImage = chakra(Image)

export const ProductCard = (props: ProductCardProps) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const { product, isEditMode } = props

  const { titles, categories, images, prices, id } = product

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
  const Content = useCallback(() => {
    return (
      <Box
        w="100%"
        h="auto"
        position="relative"
        className="game-card"
        _hover={{
          img: {
            filter: 'brightness(1)'
          },
          '.edit-button': {
            opacity: 1
          }
        }}
        overflow="hidden"
      >
        {isEditMode && (
          <IconButton
            aria-label="Edit"
            icon={<HiPencil size={20} />}
            size="xs"
            position="absolute"
            top={2}
            right={2}
            zIndex={999}
            className="edit-button"
            opacity={0}
          />
        )}

        <AspectRatio W="100%" ratio={16 / 9} position="relative">
          <Box w="100%">
            <Skeleton
              w="100%"
              h="100%"
              startColor="gray.800"
              endColor="gray.900"
              fadeDuration={0.6}
            />
            <ChakraNextImage
              src={images[0]}
              alt="oi"
              layout="fill"
              transition="all 0.2s"
              filter="brightness(0.7)"
            />
          </Box>
        </AspectRatio>

        <Box p={4}>
          <Heading fontSize={16}>{titles}</Heading>
          <Text>{categories}</Text>

          <Badge color="gray.50" bgColor="primary.500" px="12px">
            {prices.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL'
            })}
          </Badge>
        </Box>
      </Box>
    )
  }, [categories, images, isEditMode, prices, titles])

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
  return isEditMode ? (
    <>
      <Content />
    </>
  ) : (
    <Link href={`/products/${id}`} passHref>
      <a href="">
        <Content />
      </a>
    </Link>
  )
}
