import { Box, Flex, Grid } from '@chakra-ui/react'
import { useCallback } from 'react'
import { CartList } from '../../components/CartList'
import { Limiter } from '../../components/Limiter'
import { useCart } from '../../context/CartContext'

export const CartTemplate = () => {
  const { cart } = useCart()

  return (
    <>
      <Limiter minH="100vh">
        <Grid
          gridTemplateColumns={{
            base: '1fr',
            lg: '3fr 1fr'
          }}
          gap={8}
        >
          <CartList products={cart} />
          <Box h="500px" w="100%" bgColor="gray.800" p={4}>
            cartoes
          </Box>
        </Grid>
      </Limiter>
    </>
  )
}
