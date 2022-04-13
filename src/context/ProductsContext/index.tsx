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
import { Product } from '../../types/game'
import { ProductsContextType, Record } from './types'

export const ProductsContext = createContext({} as ProductsContextType)

type ProductsContextProviderProps = {
  children: ReactNode
}

export const ProductsContextProvider = (
  props: ProductsContextProviderProps
) => {
  const [record, setRecord] = useState<Record>({} as Record)
  const [editProduct, setEditProduct] = useState<Product>({} as Product)

  const [activeQuery, setActiveQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('')

  const { asPath } = useRouter()
  const toast = useToast()

  const getProducts = useCallback(async () => {
    const { data } = await api.get<Product[]>('/products')

    setRecord({
      all: data,
      current: data
    })
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
        (item) => item.category === category
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

  const handleFilterProductsByQuery = useCallback(
    (query: string) => {
      const newProducts = record.current.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
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

  const resetRecord = () => {
    setRecord((prevRecord) => {
      return {
        ...prevRecord,
        current: prevRecord.all
      }
    })
  }

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

  useEffect(() => {
    if (asPath === '/admin') {
      getProducts()
    }
  }, [asPath, getProducts])

  return (
    <ProductsContext.Provider
      value={{
        record,
        setRecord,
        resetRecord,
        handleFilterProductsByCategory,
        handleFilterProductsByQuery,
        handleDeleteProduct,
        editProduct,
        setEditProduct
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
