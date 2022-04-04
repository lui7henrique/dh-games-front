import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultProps
} from '@chakra-ui/react'

export const theme = extendTheme(
  {
    colors: {
      gray: {
        50: '#fafafa',
        100: '#969696',
        800: '#2B2B2B',
        900: '#121212'
      },
      primary: {
        400: '#05FFB8',
        500: '#04BF8A',
        600: '#006e4f',
        700: '#004430',
        800: '#002218'
      }
    },
    font: {
      footer: 'Poppins'
    },
    styles: {
      global: {
        body: {
          bg: '#121212',
          color: '#ADADAD'
        },
        'h1, h2, h3, h4, h5, h6': {
          color: '#fafafa'
        },
        '*, *::before, *::after': {
          borderColor: '#2B2B2B'
        }
      }
    },
    fonts: {
      body: 'Space Grotesk, sans-serif'
    }
  },
  withDefaultColorScheme({ colorScheme: 'primary' })
)
