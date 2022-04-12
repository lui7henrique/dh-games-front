// Vendors

// Components
import {
  Circle,
  Flex,
  Grid,
  GridProps,
  Heading,
  Text,
  theme,
  useTheme
} from '@chakra-ui/react'
import { FaSadCry, FaSearch } from 'react-icons/fa'
import { MdScreenSearchDesktop, MdSearchOff } from 'react-icons/md'
import { Product } from '../../types/game'
import { ProductCard } from '../ProductCard'

// Types
export type ProductsListProps = {
  products: Product[]
  isEditMode?: boolean
} & GridProps

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
  const { products, isEditMode = false, ...rest } = props
  const theme = useTheme()

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
      {products && products.length ? (
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          }}
          gap={2}
          {...rest}
        >
          {products.map((product, index) => {
            return (
              <ProductCard
                product={product}
                key={index}
                isEditMode={isEditMode}
              />
            )
          })}
        </Grid>
      ) : (
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
          <Text>
            Tente buscar por uma palavra chave ou filtrar por categorias. 😉
          </Text>
        </Flex>
      )}
    </>
  )
}
