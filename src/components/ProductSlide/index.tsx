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
import { useRouter } from 'next/router'
import { Product } from '../../types/product'
import { Button } from '../Button'

// Types
export type GameSlideProps = {
  product: Product
}

/*
|-----------------------------------------------------------------------------
| Component
|-----------------------------------------------------------------------------
|
|
*/

export const ProductSlide = (props: GameSlideProps) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const { product } = props

  const { title, images, description, id } = product
  const { push } = useRouter()

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
            <Image src={images[0]} layout="fill" alt={`${title} thumbnail`} />
          </Box>

          <VStack
            backgroundColor="#000000B3"
            position="absolute"
            bottom={0}
            w="100%"
            minH="30%"
            p={{ base: 4, lg: 8 }}
            alignItems="flex-start"
          >
            <Heading as="h2" fontSize={{ base: 24, lg: 28 }}>
              {title}
            </Heading>
            <Text fontSize={{ base: 14, lg: 20 }}>{description}</Text>

            <Button
              label="Compre agora"
              onClick={() => push(`/products/${id}`)}
            />
          </VStack>
        </Box>
      </AspectRatio>
    </Link>
  )
}
