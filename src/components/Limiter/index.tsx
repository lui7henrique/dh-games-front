import { Box, BoxProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

type LimiterProps = {
  children: ReactNode
} & BoxProps

export const Limiter = (props: LimiterProps) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const { children, ...rest } = props

  /*
  |-----------------------------------------------------------------------------
  | Render
  |-----------------------------------------------------------------------------
  |
  |
  */

  return (
    <Box maxWidth="1280" mx="auto" px="4" {...rest}>
      {children}
    </Box>
  )
}
