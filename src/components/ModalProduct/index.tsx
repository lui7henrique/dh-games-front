// Vendors
import { useCallback, useEffect, useMemo } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { v4 } from 'uuid'
import Image from 'next/image'
import { yupResolver } from '@hookform/resolvers/yup'

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
  useToast,
  Flex,
  Input,
  IconButton,
  chakra,
  Box,
  BoxProps,
  Progress,
  VStack,
  Text
} from '@chakra-ui/react'
import { api } from '../../services/api'
import { Product } from '../../types/game'
import { Button } from '../Button'
import { FieldSelect } from '../FieldSelect'
import { FieldText } from '../FieldText'
import { useProducts } from '../../context/ProductsContext'

import { MdFileUpload } from 'react-icons/md'
import { schema } from './schema'
import { useUpload } from '../../context/UploadContext'
import { getCategoryByValue, categories } from '../../utils/categories'
import { getSystemByValue, systems } from '../../utils/systems'

// Types
export type ModalEditProductProps = {
  product?: Product
} & Omit<ModalProps, 'children'>

type Option = {
  value: string
  label: string
}

type ProductForm = {
  id: string
  title: string
  price: number
  description: string
  image: string
  category: Option
  operationSystem: Option
}

const ChakraNextImage = chakra(Image)

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

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    clearErrors,
    formState: { isSubmitting, errors }
  } = useForm<ProductForm>({
    resolver: yupResolver(schema())
  })

  const {
    handleUploadFileByInput,
    uploadedImage,
    setUploadedImage,
    onDrop,
    onDragOver,
    isLoading
  } = useUpload()

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
        if (product) {
          const { data } = await api.put<Product>(`/products/${product.id}`, {
            ...values,
            id: product.id,
            images: [values.image]
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
            images: [values.image]
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

          reset()
        }
      } catch (err: unknown) {
        console.log(err)
      }
    },
    [modalProps, product, reset, setEditProduct, setRecord, toast]
  )

  const UploadInput = useCallback(
    (props: BoxProps) => {
      return (
        <Box {...props}>
          {isLoading ? (
            <Progress size="xs" isIndeterminate />
          ) : (
            <>
              <IconButton
                size="md"
                aria-label="upload new image"
                icon={<MdFileUpload size={40} />}
                variant="link"
                onClick={() => document.getElementById('file-input')?.click()}
              />
              <Input
                type="file"
                d="none"
                id="file-input"
                onChange={handleUploadFileByInput}
              />
            </>
          )}
        </Box>
      )
    },
    [handleUploadFileByInput, isLoading]
  )

  const ImageUploadComponent = useCallback(
    ({ url }: { url: string }) => {
      return (
        <Box
          w="100%"
          h="100%"
          _hover={{
            'div.file-upload': {
              opacity: 1
            },
            img: {
              opacity: 0.2
            }
          }}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <ChakraNextImage
            src={(uploadedImage && uploadedImage.url) ?? url}
            layout="fill"
            transition="all 0.2s"
            q={25}
            objectFit="cover"
          />

          <UploadInput
            className="file-upload"
            opacity={0}
            transition="all 0.2s"
          />
        </Box>
      )
    },
    [UploadInput, onDragOver, onDrop, uploadedImage]
  )

  /*
  |-----------------------------------------------------------------------------
  | Effects
  |-----------------------------------------------------------------------------
  |
  |
  */
  useEffect(() => {
    if (product) {
      setValue('title', product.title)

      setValue('price', product.price)

      setValue('description', product.description)

      setValue('category', product.category as any)

      setValue('operationSystem', product.operationSystem as any)

      clearErrors('image')
    }
  }, [clearErrors, product, setValue])

  useEffect(() => {
    setValue('image', uploadedImage.url)
    clearErrors('image')
  }, [clearErrors, setValue, uploadedImage])

  /*
  |-----------------------------------------------------------------------------
  | Memos
  |-----------------------------------------------------------------------------
  |
  |

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
            <FieldText
              label="Título"
              {...register('title')}
              error={errors.title}
            />
            <FieldText
              label="Preço"
              type="number"
              {...register('price')}
              error={errors.price}
            />
            <FieldText
              label="Descrição"
              {...register('description')}
              error={errors.description}
            />

            {product?.images && product.images[0] && (
              <HStack key={v4()} spacing={4}>
                <AspectRatio w="200px" h="100%" ratio={16 / 9}>
                  <ImageUploadComponent url={product.images![0]} />
                </AspectRatio>

                <FieldText
                  {...register('image')}
                  label={'Thumbnail (URL)'}
                  isDisabled
                  error={errors.image}
                  defaultValue={product.images![0]}
                />
              </HStack>
            )}

            {!product && (
              <VStack spacing={2} w="100%" align="flex-start">
                <HStack key={v4()} spacing={4} w="100%">
                  <AspectRatio w="200px" h="100%" ratio={16 / 9}>
                    {uploadedImage && uploadedImage.url ? (
                      <ImageUploadComponent url={uploadedImage.url} />
                    ) : (
                      <Flex
                        bgColor="gray.800"
                        alignItems="center"
                        justifyContent="center"
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                      >
                        <UploadInput />
                      </Flex>
                    )}
                  </AspectRatio>

                  <FieldText
                    label={'Thumbnail (URL)'}
                    {...register('image')}
                    isDisabled={!product}
                    error={errors.image}
                  />
                </HStack>

                <Text fontSize="sm" opacity={0.4}>
                  Envia a imagem clicando no botão de upload passando o mouse
                  por cima da imagem/retângulo cinza, ou arraste a imagem. 😉
                </Text>
              </VStack>
            )}

            <FieldSelect
              label="Categoria"
              {...register('category')}
              options={categories}
              placeholder="Selecione uma categoria"
              defaultValue={product?.category}
              error={errors.category as FieldError}
            />
            <FieldSelect
              label="Sistema"
              {...register('operationSystem')}
              options={systems}
              placeholder="Selecione o sistema"
              error={errors.operationSystem as FieldError}
            />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Stack direction="row">
            <Button
              label="Cancelar"
              type="reset"
              onClick={modalProps.onClose}
            />
            <Button label="Salvar" type="submit" isLoading={isSubmitting}>
              Salvar
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
