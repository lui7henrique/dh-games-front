import { Grid } from '@chakra-ui/react'
import { CartList } from '../../components/CartList'
import { Limiter } from '../../components/Limiter'
import { useCart } from '../../context/CartContext'
import { CartPayment } from '../../components/CartPayment'

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
          <CartPayment />
        </Grid>
      </Limiter>
    </>
  )
}
