import { Product } from '../../types/product'

export type Cart = Product[]

export type CartContextType = {
  cart: Cart
  loading: boolean
  handleAddProductToCart: (id: string) => Promise<void>
  handleRemoveProductFromCart: (id: string) => void
  handleClearCart: () => void
  hasProductOnCart: (id: string) => boolean
}
