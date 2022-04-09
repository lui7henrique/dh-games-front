// Vendors

// Components
import { Grid, GridProps } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { Product } from '../../types/game'
import { ProductCard } from '../ProductCard'

// Types
export type ProductsListProps = {
  products: Product[]
  isEditMode?: boolean
  setEdit?: Dispatch<SetStateAction<Product | undefined>>
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
  const { products, isEditMode = false, setEdit, ...rest } = props

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
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)'
      }}
      gap={2}
      {...rest}
    >
      {!!products.length &&
        products.map((product, index) => {
          return (
            <ProductCard
              product={product}
              key={index}
              isEditMode={isEditMode}
              onClick={
                isEditMode && setEdit ? () => setEdit(product) : undefined
              }
            />
          )
        })}
    </Grid>
  )
}
