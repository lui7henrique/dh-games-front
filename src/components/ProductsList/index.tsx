// Vendors

// Components
import { Flex, Grid, GridProps, Heading, Text } from '@chakra-ui/react'
import { useCallback } from 'react'
import { FaSadCry } from 'react-icons/fa'
import { Product } from '../../types/game'
import { ProductCard } from '../ProductCard'
import { ProductCardSkeleton } from '../ProductCardSkeleton'

// Types
export type ProductsListProps = {
  products: Product[]
  isEditMode?: boolean
  isLoading?: boolean
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
  const { products, isEditMode = false, isLoading, ...rest } = props

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
      {isLoading && (
        <List>
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
