import { Product } from '../../types/game'

export type Cart = Product[]

export type CartContextType = {
  cart: Cart
  loading: boolean
  handleAddProductToCart: (id: string) => Promise<void>
  handleRemoveProductFromCart: (id: string) => void
  hasProductOnCart: (id: string) => boolean
}
