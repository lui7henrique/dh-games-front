import * as React from 'react'

import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { theme } from '../styles/theme'
import { Header } from '../components/Header'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
