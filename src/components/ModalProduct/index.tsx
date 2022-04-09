// Vendors
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { v4 } from 'uuid'
import _ from 'lodash'

// Components
import {
  AspectRatio,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
  Image,
  Skeleton,
  useToast
} from '@chakra-ui/react'
import { api } from '../../services/api'
import { Product } from '../../types/game'
import { Button } from '../Button'
import { FieldSelect } from '../FieldSelect'
import { FieldText } from '../FieldText'
import { useProducts } from '../../context/ProductsContext'

// Types
export type ModalEditProductProps = {
  product?: Product
} & Omit<ModalProps, 'children'>

type ProductKeys = keyof ProductForm

type ProductForm = {
  id: string
  title: string
  price: number
  description: string
  images: string[]
  category: string
  operationSystem: string
}

/*
|-----------------------------------------------------------------------------
| Component
|-----------------------------------------------------------------------------
|
|
*/

export const ModalProduct = (props: ModalEditProductProps) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const { product, ...modalProps } = props

  const { handleSubmit, register, setValue, watch, control } =
    useForm<ProductForm>()

  const { setRecord, setEditProduct } = useProducts()
  const toast = useToast()

  /*
  |-----------------------------------------------------------------------------
  | States
  |-----------------------------------------------------------------------------
  |
  |
  */

  /*
  |-----------------------------------------------------------------------------
  | Functions
  |-----------------------------------------------------------------------------
  |
  |
  */
  const onSubmit = useCallback(
    async (values: ProductForm) => {
      try {
        const image =
          typeof values.images === 'string' ? [values.images] : values.images

        if (product) {
          const { data } = await api.put<Product>(`/products/${values.id}`, {
            ...values,
            images: image
          })

          setEditProduct(data)

          setRecord((prevRecord) => {
            const record = prevRecord.all.map((item) =>
              item.id === data.id ? data : item
            )

            const newRecord = {
              current: record,
              all: record
            }

            return newRecord
          })

          toast({
            title: 'Jogo atualizado com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true
          })
          modalProps.onClose()
        }

        if (!product) {
          const { data } = await api.post<Product>('/products', {
            ...values,
            images: image
          })

          setRecord((prevRecord) => {
            const record = [...prevRecord.all, data]

            const newRecord = {
              current: record,
              all: record
            }

            return newRecord
          })

          modalProps.onClose()
          toast({
            title: 'Jogo criado com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true
          })
        }
      } catch (err: unknown) {
        console.log(err)
      }
    },
    [product, setEditProduct, setRecord]
  )

  /*
  |-----------------------------------------------------------------------------
  | Effects
  |-----------------------------------------------------------------------------
  |
  |
  */
  useEffect(() => {
    product &&
      Object.keys(product).forEach((key) => {
        if (key === 'images') {
          setValue('images', product.images)
        }

        setValue(key as ProductKeys, product[key as ProductKeys])
      })
  }, [product, setValue])

  /*
  |-----------------------------------------------------------------------------
  | Memos
  |-----------------------------------------------------------------------------
  |
  |
  */
  const systemOptions = useMemo(
    () => [
      {
        label: 'PC',
        value: 'pc'
      },
      {
        label: 'PS4',
        value: 'ps4'
      },
      {
        label: 'XBOX',
        value: 'xbox'
      },
      {
        label: 'SWITCH',
        value: 'switch'
      },
      {
        label: 'Mobile',
        value: 'mobile'
      }
    ],
    []
  )

  /*
  |-----------------------------------------------------------------------------
  | Renders
  |-----------------------------------------------------------------------------
  |
  |
  */
  return (
    <Modal {...modalProps} size="2xl">
      <ModalOverlay />
      <ModalContent
        borderRadius="sm"
        bgColor="gray.900"
        pb={6}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalHeader>Editar produto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FieldText label="Título" {...register('title')} />
            <FieldText label="Preço" {...register('price')} />
            <FieldText label="Descrição" {...register('description')} />

            {product?.images && product.images[0] && (
              <HStack key={v4()}>
                <AspectRatio w="200px" h="100%" ratio={16 / 9}>
                  <Image
                    src={product.images![0]}
                    layout="fill"
                    alt="Imagem do produto"
                  />
                </AspectRatio>

                <FieldText {...register('images')} label={'Thumbnail (URL)'} />
              </HStack>
            )}

            {!product && (
              <HStack key={v4()}>
                <AspectRatio w="200px" h="100%" ratio={16 / 9}>
                  <Skeleton
                    w="100%"
                    h="100%"
                    startColor="gray.800"
                    endColor="gray.900"
                    fadeDuration={0.6}
                  />
                </AspectRatio>
                <FieldText label={'Thumbnail (URL)'} {...register('images')} />
              </HStack>
            )}

            <FieldText label="Categoria" {...register('category')} />
            <FieldSelect
              label="Sistema"
              {...register('operationSystem')}
              options={systemOptions}
              placeholder="Selecione o sistema"
            />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Stack direction="row">
            <Button label="Cancelar" onClick={modalProps.onClose} />
            <Button label="Salvar" type="submit">
              Salvar
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
