import * as React from 'react'

import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import { theme } from '../styles/theme'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { AuthContextProvider } from '../context/AuthContext'
import { ProductsContextProvider } from '../context/ProductsContext'
import { UploadContextProvider } from '../context/UploadContext'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <ProductsContextProvider>
          <UploadContextProvider>
            <CSSReset />
            <Header />
            <Component {...pageProps} />
            <Footer />
          </UploadContextProvider>
        </ProductsContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
