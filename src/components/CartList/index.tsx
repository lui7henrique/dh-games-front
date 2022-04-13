// Vendors

// Components
import {
  AspectRatio,
  Box,
  chakra,
  Divider,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import Image from 'next/image'
import { useCallback } from 'react'
import { Product } from '../../types/game'

// Types
export type CartListProps = {
  products: Product[]
}

type ProductProps = {
  product: Product
}

/*
|-----------------------------------------------------------------------------
| Component
|-----------------------------------------------------------------------------
|
|
*/
const ChakraNextImage = chakra(Image)

export const CartList = (props: CartListProps) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const { products } = props

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
  const Product = useCallback((props: ProductProps) => {
    const { product } = props
    const { images, title, description } = product

    return (
      <Stack
        direction={{ base: 'column', md: 'row' }}
        w="100%"
        pr={4}
        py={4}
        spacing={4}
      >
        <AspectRatio w={{ base: '100%', md: '50%' }} ratio={16 / 9}>
          <ChakraNextImage
            src={images[0]}
            layout="fill"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </AspectRatio>

        <VStack w={{ base: '100%', md: '100%' }} alignItems="flex-start">
          <Heading as="h2" fontSize={20}>
            {title}
          </Heading>
          <Text>{description}</Text>
        </VStack>
      </Stack>
    )
  }, [])

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
    <VStack alignItems="flex-start" divider={<Divider />}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </VStack>
  )
}
