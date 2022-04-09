// Vendors

// Components
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack
} from '@chakra-ui/react'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../../services/api'
import { Product } from '../../types/game'
import { capitalizeFirstLetter } from '../../utils/capitalize'
import { Button } from '../Button'
import { FieldSelect } from '../FieldSelect'
import { FieldText } from '../FieldText'

// Types
export type ModalEditProductProps = {
  product?: Product
} & Omit<ModalProps, 'children'>

type ProductKeys = keyof Product

type ProductForm = {
  id: string
  titulo: string
  preco: number
  descricao: string
  imagem: string[]
  categoria: string
  sistema: string
}

/*
|-----------------------------------------------------------------------------
| Component
|-----------------------------------------------------------------------------
|
|
*/

export const ModalEditProduct = (props: ModalEditProductProps) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const { product, ...modalProps } = props
  const { titulo, categoria, preco, imagem, sistema } = product || {}

  const { handleSubmit, register, setValue } = useForm<ProductForm>()

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
  const onSubmit = useCallback(async (values: ProductForm) => {
    try {
      const response = await api.put(`/products/${values.id}`, {
        ...values
      })

      console.log(response)
    } catch (err: unknown) {}
  }, [])

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
            {/* TODO: TROCAR PRA INGLÊS ESSA PORRA */}
            <FieldText label="Título" {...register('titulo')} />
            <FieldText label="Preço" {...register('preco')} />
            <FieldText label="Descrição" {...register('descricao')} />
            <FieldText label="Imagem" {...register('imagem')} />
            <FieldText label="Categoria" {...register('categoria')} />
            <FieldSelect
              label="Sistema"
              {...register('sistema')}
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
