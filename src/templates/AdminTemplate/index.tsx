import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { debounce, get } from 'lodash'

import {
  Divider,
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
import { FieldSelect } from '../../components/FieldSelect'
import { ProductsList } from '../../components/ProductsList'
import { ModalProduct } from '../../components/ModalProduct'

export const AdminTemplate = () => {
  const {
    record,
    categories,
    handleFilterProductsByCategory,
    handleFilterProductsByQuery
  } = useProducts()

  const { isOpen, onClose, onOpen } = useDisclosure()
  const { getProducts, isLoading, setIsLoading } = useProducts()

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
    if (!get(record, 'all.length')) {
      getProducts()
    }
  }, [getProducts])

  return (
    <>
      <Limiter minH="100vh">
        <Grid
          templateColumns={{ base: '1fr', md: '1fr 2fr', lg: '1fr 3fr' }}
          gap={8}
        >
          <VStack as="form" w="100%" spacing={4}>
            <Stack
              spacing={4}
              direction="column"
              w="100%"
              divider={<Divider />}
            >
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
                  ...categories.map((category) => {
                    return {
                      label: category.name,
                      value: String(category.id)
                    }
                  })
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
            <Button
              label="Adicionar novo produto"
              leftIcon={<FiPlusCircle size={20} />}
              onClick={onOpen}
              w="100%"
            />
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
