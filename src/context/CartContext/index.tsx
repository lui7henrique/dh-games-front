import { useToast } from '@chakra-ui/react'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { api } from '../../services/api'
import { Product } from '../../types/product'
import { Cart, CartContextType } from './types'

export const CartContext = createContext({} as CartContextType)

type CartContextProviderProps = {
  children: ReactNode
}

export const CartContextProvider = (props: CartContextProviderProps) => {
  const [cart, setCart] = useState<Cart>([] as Cart)
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const key = '@dh-games-cart'

  const saveCartOnLocalStorage = useCallback((newCart: Cart) => {
    const serializedCart = JSON.stringify(newCart)
    localStorage.setItem(key, serializedCart)
  }, [])

  const handleAddProductToCart = useCallback(
    async (id: string) => {
      setLoading(true)

      try {
        const { data } = await api.get<Product>(`/products/${id}`)
        setCart((prevCart) => {
          const newCart = [...prevCart, data]
          saveCartOnLocalStorage(newCart)

          return newCart
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
    [saveCartOnLocalStorage, toast]
  )

  const handleRemoveProductFromCart = useCallback(
    (id: string) => {
      setCart((prevCart) => {
        const newCart = prevCart.filter((product) => product.id !== id)

        saveCartOnLocalStorage(newCart)

        return newCart
      })

      toast({
        title: 'Produto removido do carrinho',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    },
    [saveCartOnLocalStorage, toast]
  )

  const hasProductOnCart = useCallback(
    (id: string) => {
      return cart.findIndex((product) => product.id === id) !== -1
    },
    [cart]
  )

  const handleClearCart = useCallback(() => {
    setCart([])
    saveCartOnLocalStorage([])
  }, [saveCartOnLocalStorage])

  useEffect(() => {
    const storedCart = localStorage.getItem(key)

    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleClearCart,
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
