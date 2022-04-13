import { useToast } from '@chakra-ui/react'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react'
import { api } from '../../services/api'
import { Product } from '../../types/game'
import { Cart, CartContextType } from './types'

export const CartContext = createContext({} as CartContextType)

type CartContextProviderProps = {
  children: ReactNode
}

export const CartContextProvider = (props: CartContextProviderProps) => {
  const [cart, setCart] = useState<Cart>([] as Cart)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleAddProductToCart = useCallback(
    async (id: string) => {
      setLoading(true)

      try {
        const { data } = await api.get<Product>(`/products/${id}`)
        setCart((prevCart) => {
          return [...prevCart, data]
        })

        toast({
          title: 'Produto adicionado ao carrinho',
          status: 'success',
          duration: 2000,
          isClosable: true
        })
      } catch {
        console.error('Erro ao adicionar o produto')
      } finally {
        setLoading(false)
      }
    },
    [toast]
  )

  const handleRemoveProductFromCart = useCallback(
    (id: string) => {
      setCart((prevCart) => {
        return prevCart.filter((product) => product.id !== id)
      })

      toast({
        title: 'Produto removido do carrinho',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    },
    [toast]
  )

  const hasProductOnCart = useCallback(
    (id: string) => {
      return cart.findIndex((product) => product.id === id) !== -1
    },
    [cart]
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        hasProductOnCart
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const value = useContext(CartContext)

  return value
}
