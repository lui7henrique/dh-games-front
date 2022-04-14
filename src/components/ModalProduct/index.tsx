// Vendors
import { useCallback, useEffect, useRef } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { v4 } from 'uuid'
import Image from 'next/image'
import { yupResolver } from '@hookform/resolvers/yup'

// Components
import {
  AspectRatio,
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

import { schema } from './schema'
import { useUpload } from '../../context/UploadContext'
import { categories } from '../../utils/categories'
import { systems } from '../../utils/systems'

import { MdFileUpload } from 'react-icons/md'
import { FaTrashAlt } from 'react-icons/fa'
import { ImageType } from '../../context/UploadContext/types'
import { get } from 'lodash'

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
  const image = get(product, 'images[0]', '')

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

  const { setRecord, setEditProduct, handleDeleteProduct } = useProducts()
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
          setUploadedImage({} as ImageType)
        }
      } catch (err: unknown) {
        console.log(err)
      }
    },
    [
      modalProps,
      product,
      reset,
      setEditProduct,
      setRecord,
      setUploadedImage,
      toast
    ]
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

      setValue('image', image)
    }
  }, [clearErrors, image, product, setValue])

  useEffect(() => {
    if (Object.keys(uploadedImage).length) {
      setValue('image', uploadedImage.url)
      clearErrors('image')
    }
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
    <Modal size="2xl" motionPreset="scale" {...modalProps}>
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
              <VStack spacing={2} w="100%" align="flex-start">
                <Stack
                  direction={{ base: 'column', lg: 'row' }}
                  key={v4()}
                  spacing={4}
                  w="100%"
                >
                  <AspectRatio
                    w={{ base: '100%', lg: '200px' }}
                    h="100%"
                    ratio={16 / 9}
                  >
                    <ImageUploadComponent url={product.images![0]} />
                  </AspectRatio>

                  <FieldText
                    {...register('image')}
                    label={'Thumbnail (URL)'}
                    isDisabled
                    error={errors.image}
                  />
                </Stack>

                <Text fontSize="sm" opacity={0.4}>
                  Envia a imagem clicando no botão de upload passando o mouse
                  por cima da imagem/retângulo cinza, ou arraste a imagem. 😉
                </Text>
              </VStack>
            )}

            {!product && (
              <VStack spacing={2} w="100%" align="flex-start">
                <Stack
                  direction={{ base: 'column', lg: 'row' }}
                  key={v4()}
                  spacing={4}
                  w="100%"
                >
                  <AspectRatio
                    w={{ base: '100%', lg: '200px' }}
                    h="100%"
                    ratio={16 / 9}
                  >
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
                </Stack>

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
          <Flex
            w="100%"
            justifyContent={product ? 'space-between' : 'flex-end'}
          >
            {product && (
              <Button
                label="Excluir"
                leftIcon={<FaTrashAlt size={16} />}
                onClick={() => {
                  handleDeleteProduct(product.id)
                  modalProps.onClose()
                }}
                colorScheme="red"
              />
            )}

            <Stack direction="row">
              <Button
                label="Cancelar"
                type="reset"
                onClick={modalProps.onClose}
                variant="outline"
              />
              <Button label="Salvar" type="submit" isLoading={isSubmitting}>
                Salvar
              </Button>
            </Stack>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
