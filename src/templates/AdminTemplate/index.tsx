import { useCallback, useEffect, useState } from 'react'

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

  const { register, watch, handleSubmit } = useForm<ValuesForm>()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const watchCategory = watch('category')

  const debounceSearch = useCallback(
    debounce((value) => {
      handleFilterProductsByQuery(value)
    }, 1200),
    []
  )

  const onSubmit = useCallback(
    (values: ValuesForm) => {
      debounceSearch(values.query)
    },
    [debounceSearch]
  )

  useEffect(() => {
    if (watchCategory) {
      handleFilterProductsByCategory(watchCategory)
    }
  }, [watchCategory])

  return (
    <>
      <Limiter minH="100vh">
        <Grid templateColumns={{ base: '1fr', lg: '1fr 3fr' }} gap={8}>
          <VStack
            justifyContent="space-between"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            w="100%"
          >
            <Stack spacing={4} direction="column" w="100%">
              <Button
                label="Adicionar novo produto"
                leftIcon={<FiPlusCircle size={20} />}
                onClick={onOpen}
              />

              <FieldSelect
                {...register('category')}
                options={[
                  {
                    label: 'Tudo',
                    value: 'Tudo'
                  },
                  ...categories
                ]}
                defaultValue={'Tudo'}
              />

              <InputGroup>
                <FieldText
                  placeholder="Busque por um produto"
                  multiple
                  inputLeftElement={<FiSearch size={20} />}
                  w="100%"
                  {...register('query')}
                />
              </InputGroup>
            </Stack>
          </VStack>

          <VStack gap={8} alignItems="flex-end" w="100%">
            {record.current && (
              <ProductsList products={record.current} w="100%" isEditMode />
            )}
          </VStack>
        </Grid>
      </Limiter>

      <ModalProduct isOpen={isOpen} onClose={onClose} />
    </>
  )
}
