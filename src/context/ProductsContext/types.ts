import { Dispatch, SetStateAction } from 'react'
import { Product } from '../../types/game'

export type Record = {
  all: Product[]
  current: Product[]
}

export type ProductsContextType = {
  record: Record
  setRecord: Dispatch<SetStateAction<Record>>
  getProducts: () => void
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  resetRecord: () => void
  handleFilterProductsByCategory: (category: string) => void
  handleFilterProductsByQuery: (query: string) => void
  handleDeleteProduct: (id: string) => Promise<void>
  editProduct: Product
  setEditProduct: Dispatch<SetStateAction<Product>>
}
