// Vendors
import Image from 'next/image'
import { useCallback, useMemo } from 'react'
import Link from 'next/link'

// Components
import {
  AspectRatio,
  chakra,
  Flex,
  Heading,
  Text,
  VStack,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
  IconButton,
  Tooltip,
  HStack
} from '@chakra-ui/react'

import { Product } from '../../types/game'

import { MdRemoveShoppingCart } from 'react-icons/md'
import { useCart } from '../../context/CartContext'
import { FiX } from 'react-icons/fi'
import { HiInformationCircle } from 'react-icons/hi'

// Types
export type CartListProps = {
  products: Product[]
}

type ProductProps = {
  product: Product
}

/*
|-----------------------------------------------------------------------------
| Component
|-----------------------------------------------------------------------------
|
|
*/
const ChakraNextImage = chakra(Image)

export const CartList = (props: CartListProps) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const { products } = props
  const { handleRemoveProductFromCart } = useCart()

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
  const Product = useCallback(
    (props: ProductProps) => {
      const { product } = props
      const { id, images, title, description, price } = product

      return (
        <Tr w="100%">
          <Td w="20%">
            <AspectRatio ratio={16 / 9}>
              <ChakraNextImage
                src={images[0]}
                layout="fill"
                w="100%"
                h="100%"
                objectFit="cover"
              />
            </AspectRatio>
          </Td>

          <Td w="50%">
            <VStack w="100%" alignItems="flex-start">
              <Heading as="h2" fontSize={20}>
                {title}
              </Heading>
              <Text
                fontSize={16}
                color="gray.300"
                whiteSpace="normal"
                noOfLines={3}
              >
                {description}
              </Text>
            </VStack>
          </Td>

          <Td isNumeric w="10%">
            <Text fontSize={16} color="gray.300">
              {price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </Text>
          </Td>

          <Td textAlign="center" w="10%">
            <Tooltip label="Remover do carrinho">
              <IconButton
                aria-label="Remove product from cart"
                borderRadius="sm"
                onClick={() => handleRemoveProductFromCart(id)}
                icon={<FiX size={20} />}
                variant="outline"
              />
            </Tooltip>
          </Td>
        </Tr>
      )
    },
    [handleRemoveProductFromCart]
  )

  const NotFound = useCallback(() => {
    return (
      <VStack w="100%" alignItems="center" justifyContent="center" spacing={4}>
        <Flex
          alignItems="center"
          justifyContent="center"
          bgColor="primary.500"
          p={4}
          borderRadius="full"
        >
          <MdRemoveShoppingCart size={40} color="white" />
        </Flex>
        <VStack spacing={2}>
          <Heading as="h2" size="md">
            Parece que seu carrinho está vazio...
          </Heading>
          <Text textAlign="center">
            Explore{' '}
            <Link href="/products">
              <a>
                <Text as="span" color="primary.500">
                  produtos
                </Text>
              </a>
            </Link>{' '}
            e adicione-os ao seu carrinho.
          </Text>
        </VStack>
      </VStack>
    )
  }, [])

  /*
  |-----------------------------------------------------------------------------
  | Effects
  |-----------------------------------------------------------------------------
  |
  |
  */

  /*
  |-----------------------------------------------------------------------------
  | Memos
  |-----------------------------------------------------------------------------
  |
  |
  */
  const tableHeaders = useMemo(
    () => [
      {
        key: 'image',
        label: 'Imagem'
      },
      {
        key: 'title',
        label: 'Produto'
      },
      {
        key: 'price',
        label: 'Preço',
        options: {
          isNumeric: true
        }
      },
      {
        key: 'remove',
        label: 'Remover'
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
    <>
      {products.length ? (
        <VStack
          spacing={6}
          width={{
            base: '100vw',
            md: '100%'
          }}
        >
          <TableContainer>
            <Table
              variant="simple"
              textColor="gray.800"
              sx={{
                td: {
                  borderBottomColor: 'gray.800'
                },
                th: {
                  color: 'gray.700'
                }
              }}
              overflow="hidden"
            >
              <Thead>
                {tableHeaders.map((header) => {
                  return (
                    <Th
                      key={header.key}
                      {...header.options}
                      sx={{
                        borderBottomColor: 'gray.800'
                      }}
                    >
                      <Text fontWeight="bold">{header.label}</Text>
                    </Th>
                  )
                })}
              </Thead>

              <Tbody>
                {products.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </Tbody>

              <Tfoot>
                <Tr>
                  <Th></Th>
                  <Th></Th>
                  <Th isNumeric>
                    Total:{' '}
                    {products
                      .reduce((acc, value) => {
                        return acc + value.price
                      }, 0)
                      .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </VStack>
      ) : (
        <NotFound />
      )}
    </>
  )
}
