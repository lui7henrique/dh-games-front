import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    gray: {
      50: '#fafafa',
      100: '#969696',
      800: '#2B2B2B',
      900: '#121212'
    },
    primary: {
      500: '#04BF8A',
      600: '#006e4f'
      // ...
    }
  },
  styles: {
    global: {
      body: {
        bg: '#121212',
        color: '#ADADAD'
      },
      'h1, h2, h3, h4, h5, h6': {
        color: '#fafafa'
      }
    }
  },
  fonts: {
    body: 'Space Grotesk, sans-serif'
  }
})
