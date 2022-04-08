import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  useTheme
} from '@chakra-ui/react'

type ButtonProps = {
  label: string
  customVariant?: 'solid' | 'gradient' | 'none'
} & ChakraButtonProps

export const Button = (props: ButtonProps) => {
  const { label, customVariant = 'none', ...rest } = props

  const { colors } = useTheme()

  const background = {
    solid: colors.primary['500'],
    gradient: `linear-gradient(180deg, ${colors.primary['600']} 0%, ${colors.primary['500']} 100%)`,
    none: undefined
  }

  const backgroundHover = {
    solid: colors.primary['600'],
    gradient: `linear-gradient(180deg, ${colors.primary['600']} 20%, ${colors.primary['500']} 120%)`,
    none: undefined
  }

  return (
    <ChakraButton
      transition="all 0.2s ease-in"
      background={background[customVariant]}
      _hover={{
        background: backgroundHover,
        filter: 'brightness(80%)'
      }}
      borderRadius="sm"
      {...rest}
    >
      {label}
    </ChakraButton>
  )
}
