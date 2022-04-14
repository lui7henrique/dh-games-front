import { useCallback } from 'react'
import { MdRemoveShoppingCart } from 'react-icons/md'
import Link from 'next/link'
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
  keyframes
} from '@chakra-ui/react'

import { CartList } from '../../components/CartList'
import { Limiter } from '../../components/Limiter'
import { useCart } from '../../context/CartContext'
import { CartPayment } from '../../components/CartPayment'
import { motion } from 'framer-motion'

export const CartTemplate = () => {
  const { cart } = useCart()

  const NotFound = useCallback(() => {
    const animationKeyframes = keyframes`
      0% { transform: translateY(0%) }
      25% { transform: translateY(-10%) }
      50% { transform: translateY(0%) }
      75% { transform: translateY(-25%) }
      100% { transform: translateY(0%)  }
    `

    const animation = `${animationKeyframes} 2s ease-in-out infinite`

    return (
      <VStack
        w="100%"
        alignItems="center"
        h="calc(100vh - 7rem)"
        justifyContent="center"
        spacing={4}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          bgColor="primary.500"
          p={4}
          borderRadius="full"
          as={motion.div}
          animation={animation}
        >
          <MdRemoveShoppingCart size={40} color="white" />
        </Flex>

        <VStack spacing={2}>
          <Heading as="h2" size="md">
            Parece que seu carrinho está vazio...
          </Heading>
          <Text textAlign="center">
            Explore{' '}
            <Link href="/products">
              <a>
                <Text as="span" color="primary.500">
                  produtos
                </Text>
              </a>
            </Link>{' '}
            e adicione-os ao seu carrinho.
          </Text>
        </VStack>
      </VStack>
    )
  }, [])

  return (
    <>
      <Limiter
        minH={cart.length > 0 ? 'calc(100vh - 7rem)' : 'calc(100vh - 7rem)'}
      >
        {cart.length ? (
          <Grid
            gridTemplateColumns={{
              base: '1fr',
              lg: '3fr 1fr'
            }}
            px={{
              base: '0',
              md: '4'
            }}
            gap="4"
          >
            <CartList products={cart} />
            <Box>
              <CartPayment />
            </Box>
          </Grid>
        ) : (
          <NotFound />
        )}
      </Limiter>
    </>
  )
}
