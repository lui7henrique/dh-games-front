import { Dispatch, SetStateAction } from 'react'
import { Product } from '../../types/product'

export type Record = {
  all: Product[]
  current: Product[]
}

export type ProductsContextType = {
  record: Record
  setRecord: Dispatch<SetStateAction<Record>>
  categories: Category[]
  getProducts: () => void
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  resetRecord: () => void
  handleFilterProductsByCategory: (category: string) => void
  handleFilterProductsByQuery: (query: string) => void
  handleDeleteProduct: (id: string) => Promise<void>
}

export type Category = {
  id: number
  name: string
}
