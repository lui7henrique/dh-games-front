import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
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
import { ProductsContextType, Record } from './types'

export const ProductsContext = createContext({} as ProductsContextType)

type ProductsContextProviderProps = {
  children: ReactNode
}

export const ProductsContextProvider = (
  props: ProductsContextProviderProps
) => {
  const [record, setRecord] = useState<Record>({} as Record)

  const [activeQuery, setActiveQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('')

  const toast = useToast()
  const { asPath } = useRouter()

  const getProducts = useCallback(async () => {
    const { data } = await api.get<Product[]>('/products')

    setRecord({
      all: data,
      current: data
    })
  }, [])

  const handleFilterProductsByCategory = useCallback((category: string) => {
    setActiveCategory(category)
  }, [])

  const handleFilterProductsByQuery = useCallback((query: string) => {
    setActiveQuery(query)
  }, [])

  const handleDeleteProduct = useCallback(
    async (id: string) => {
      await api.delete(`/products/${id}`)

      setRecord((prevRecord) => {
        return {
          current: prevRecord.current.filter((product) => product.id !== id),
          all: prevRecord.all.filter((item) => item.id !== id)
        }
      })

      toast({
        title: 'Produto excluído com sucesso!',
        description: '',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    },
    [toast]
  )

  const resetRecord = useCallback(() => {
    setRecord((prevRecord) => {
      return {
        ...prevRecord,
        current: prevRecord.all
      }
    })
  }, [])

  useEffect(() => {
    const hasQuery = activeQuery !== ''
    const hasCategory = activeCategory !== ''

    if (!hasQuery && !hasCategory) {
      resetRecord()
    }

    if (hasQuery && !hasCategory) {
      const newProducts = record.all.filter((item) => {
        return (
          item.title.toLowerCase().includes(activeQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(activeQuery.toLowerCase())
        )
      })

      setRecord((prevRecord) => {
        return {
          ...prevRecord,
          current: newProducts
        }
      })
    }

    if (hasQuery && hasCategory) {
      const newProducts = record.all.filter((item) => {
        return (
          (item.title.toLowerCase().includes(activeQuery.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(activeQuery.toLowerCase())) &&
          item.category === activeCategory
        )
      })

      setRecord((prevRecord) => {
        return {
          ...prevRecord,
          current: newProducts
        }
      })
    }

    if (!hasQuery && hasCategory) {
      const newProducts = record.all.filter(
        (item) => item.category === activeCategory
      )

      setRecord((prevRecord) => {
        return {
          ...prevRecord,
          current: newProducts
        }
      })
    }
  }, [activeQuery, activeCategory])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  useEffect(() => {
    resetRecord()
  }, [asPath, resetRecord])

  return (
    <ProductsContext.Provider
      value={{
        record,
        setRecord,
        resetRecord,
        handleFilterProductsByCategory,
        handleFilterProductsByQuery,
        handleDeleteProduct
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
