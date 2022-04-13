import {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState
} from 'react'

import {
  Grid,
  InputGroup,
  Stack,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import { Button } from '../../components/Button'
import { Limiter } from '../../components/Limiter'
import { useProducts } from '../../context/ProductsContext'

import { FiPlusCircle, FiSearch } from 'react-icons/fi'
import { FieldText } from '../../components/FieldText'
import { useForm } from 'react-hook-form'
import { FieldSelect } from '../../components/FieldSelect'
import { ProductsList } from '../../components/ProductsList'
import { ModalProduct } from '../../components/ModalProduct'
import { categories } from '../../utils/categories'
import { debounce } from 'lodash'

type ValuesForm = {
  category: string
  query: string
}

export const AdminTemplate = () => {
  const {
    record,
    handleFilterProductsByCategory,
    handleFilterProductsByQuery
  } = useProducts()

  const { isOpen, onClose, onOpen } = useDisclosure()
  const [isLoading, setIsLoading] = useState(true)

  const debounceSearchByQuery = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value

      handleFilterProductsByQuery(query)
      setIsLoading(false)
    }, 1200),
    []
  )

  const debounceSearchByCategory = useCallback(
    debounce((e: ChangeEvent<HTMLSelectElement>) => {
      const category = e.target.value

      handleFilterProductsByCategory(category)
      setIsLoading(false)
    }, 1200),
    []
  )

  useEffect(() => {
    if (record && record.all) {
      !!record.all.length && setIsLoading(false)
    }
  }, [record])

  return (
    <>
      <Limiter minH="100vh">
        <Grid
          templateColumns={{ base: '1fr', md: '1fr 2fr', lg: '1fr 3fr' }}
          gap={8}
        >
          <VStack justifyContent="space-between" as="form" w="100%">
            <Stack spacing={4} direction="column" w="100%">
              <Button
                label="Adicionar novo produto"
                leftIcon={<FiPlusCircle size={20} />}
                onClick={onOpen}
              />

              <FieldSelect
                options={[
                  {
                    label: 'Tudo',
                    value: 'Tudo'
                  },
                  ...categories
                ]}
                defaultValue={'Tudo'}
                name="category"
                onChange={(e) => {
                  setIsLoading(true)
                  debounceSearchByCategory(e)
                }}
              />

              <InputGroup>
                <FieldText
                  placeholder="Busque por um produto"
                  multiple
                  inputLeftElement={<FiSearch size={20} />}
                  w="100%"
                  name="query"
                  onChange={(e) => {
                    setIsLoading(true)
                    debounceSearchByQuery(e)
                  }}
                />
              </InputGroup>
            </Stack>
          </VStack>

          <VStack gap={8} alignItems="flex-end" w="100%">
            {record.current && (
              <ProductsList
                products={record.current}
                w="100%"
                isEditMode
                isLoading={isLoading}
              />
            )}
          </VStack>
        </Grid>
      </Limiter>

      <ModalProduct isOpen={isOpen} onClose={onClose} />
    </>
  )
}
