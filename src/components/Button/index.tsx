import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  useTheme
} from '@chakra-ui/react'

type ButtonProps = {
  label: string
} & ChakraButtonProps

export const Button = (props: ButtonProps) => {
  const { label, ...rest } = props

  const { colors } = useTheme()

  return (
    <ChakraButton
      transition="all 0.2s ease-in"
      background={`linear-gradient(180deg, ${colors.primary['600']} 0%, ${colors.primary['500']} 100%)`}
      _hover={{
        background: `linear-gradient(180deg, ${colors.primary['600']} 20%, ${colors.primary['500']} 120%)`,
        filter: 'brightness(80%)'
      }}
      borderRadius="sm"
      {...rest}
    >
      {label}
    </ChakraButton>
  )
}
