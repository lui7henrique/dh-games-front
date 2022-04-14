// Vendors

// Components
import {
  Box,
  Flex,
  Grid,
  GridProps,
  Heading,
  HStack,
  Text
} from '@chakra-ui/react'
import { useCallback } from 'react'
import { FaSadCry } from 'react-icons/fa'
import { Product } from '../../types/product'
import { ProductCard } from '../ProductCard'
import { ProductCardSkeleton } from '../ProductCardSkeleton'

// Types
export type ProductsListProps = {
  title?: string
  products: Product[]
  isEditMode?: boolean
  isLoading?: boolean
  listProps?: GridProps
} & GridProps

type ListProps = {} & GridProps

/*
|-----------------------------------------------------------------------------
| Component
|-----------------------------------------------------------------------------
|
|
*/

export const ProductsList = (props: ProductsListProps) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const {
    title,
    products,
    isEditMode = false,
    isLoading,
    listProps,
    ...rest
  } = props

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
  const NotFound = useCallback(() => {
    return (
      <Flex
        w="100%"
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="100%"
      >
        <Flex
          alignItems="center"
          w="50"
          bgColor="primary.500"
          p={4}
          mb={4}
          borderRadius="full"
        >
          <FaSadCry size={40} color="white" />
        </Flex>
        <Heading as="h2" size="md">
          Nenhum produto foi encontrado.
        </Heading>
        <Text textAlign="center">
          Tente buscar por uma palavra chave ou filtrar por categorias. 😉
        </Text>
      </Flex>
    )
  }, [])

  const List = useCallback(
    (props: ListProps) => {
      return (
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          }}
          gap={2}
          {...rest}
        >
          {props.children}
        </Grid>
      )
    },
    [rest]
  )
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

  /*
  |-----------------------------------------------------------------------------
  | Renders
  |-----------------------------------------------------------------------------
  |
  |
  */
  return (
    <>
      {title && (
        <HStack mb={4}>
          <Box h="32px" w="8px" bgColor="primary.500" />
          <Heading fontSize={{ base: 20, lg: 24 }}>{title}</Heading>
        </HStack>
      )}

      {isLoading && (
        <List {...listProps}>
          {Array.from({
            length: 9
          }).map(() => {
            return <ProductCardSkeleton key={Math.random()} />
          })}
        </List>
      )}

      {!isLoading && products && products.length ? (
        <List>
          {products.map((product, index) => {
            return (
              <ProductCard
                product={product}
                key={index}
                isEditMode={isEditMode}
              />
            )
          })}
        </List>
      ) : (
        <></>
      )}

      {!isLoading && !products.length && <NotFound />}
    </>
  )
}
