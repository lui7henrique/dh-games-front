import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'

import { Divider, Grid, InputGroup, Stack, VStack } from '@chakra-ui/react'
import {} from '../../components/Button'
import { Limiter } from '../../components/Limiter'
import { useProducts } from '../../context/ProductsContext'

import { FiSearch } from 'react-icons/fi'
import { FieldText } from '../../components/FieldText'
import { FieldSelect } from '../../components/FieldSelect'
import { ProductsList } from '../../components/ProductsList'
import { categories } from '../../utils/categories'

export const ProductsTemplate = () => {
  const {
    record,
    handleFilterProductsByCategory,
    handleFilterProductsByQuery
  } = useProducts()

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
    <Limiter minH="100vh">
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 2fr', lg: '1fr 3fr' }}
        gap={8}
      >
        <VStack as="form" w="100%" spacing={4}>
          <Stack spacing={4} direction="column" w="100%" divider={<Divider />}>
            <InputGroup>
              <FieldText
                label="Busque por um produto"
                placeholder="Digite o nome do produto"
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

            <FieldSelect
              options={[
                {
                  label: 'Tudo',
                  value: ''
                },
                ...categories
              ]}
              defaultValue={'Tudo'}
              name="category"
              onChange={(e) => {
                setIsLoading(true)
                debounceSearchByCategory(e)
              }}
              label="Busque por uma categoria:"
            />
          </Stack>
        </VStack>

        <VStack gap={8} alignItems="flex-end" w="100%">
          {record.current && (
            <ProductsList
              products={record.current}
              w="100%"
              isLoading={isLoading}
            />
          )}
        </VStack>
      </Grid>
    </Limiter>
  )
}
