import {} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { api } from '../services/api'
import { Product } from '../types/game'

type Record = {
  all: Product[]
  current: Product[]
}

type ProductsContextType = {
  record: Record
  categories: string[]
  handleFilterProductsByCategory: (category: string) => void
}

export const ProductsContext = createContext({} as ProductsContextType)

type ProductsContextProviderProps = {
  children: ReactNode
}

export const ProductsContextProvider = (
  props: ProductsContextProviderProps
) => {
  const [record, setRecord] = useState<Record>({} as Record)
  const [categories, setCategories] = useState<string[]>([])

  const { asPath } = useRouter()

  const getProducts = useCallback(async () => {
    const { data } = await api.get<Product[]>('/products')

    setRecord({
      all: data,
      current: data
    })

    const categories = Array.from(
      new Set(data.map((product) => product.categoria))
    )
    setCategories(['Tudo', ...categories])
  }, [])

  const handleFilterProductsByCategory = useCallback(
    (category: string) => {
      if (category === 'Tudo') {
        setRecord((prevRecord) => {
          return {
            ...prevRecord,
            current: prevRecord.all
          }
        })
        return
      }

      const newProducts = record.all.filter(
        (item) => item.categoria === category
      )

      setRecord((prevRecord) => {
        return {
          ...prevRecord,
          current: newProducts
        }
      })
    },
    [record]
  )

  useEffect(() => {
    if (asPath === '/admin') {
      getProducts()
    }
  }, [asPath, getProducts])

  return (
    <ProductsContext.Provider
      value={{
        record,
        categories,
        handleFilterProductsByCategory
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => {
  const value = useContext(ProductsContext)

  return value
}
