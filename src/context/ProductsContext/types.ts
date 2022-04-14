import { Dispatch, SetStateAction } from 'react'
import { Product } from '../../types/game'

export type Record = {
  all: Product[]
  current: Product[]
}

export type ProductsContextType = {
  record: Record
  setRecord: Dispatch<SetStateAction<Record>>
  resetRecord: () => void
  handleFilterProductsByCategory: (category: string) => void
  handleFilterProductsByQuery: (query: string) => void
  handleDeleteProduct: (id: string) => Promise<void>
}
