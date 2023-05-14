'use client'

import { buttonTheme } from '@/elements/button'
import { inputTheme } from '@/elements/input'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    app: {
      black: {
        1: '#49474B',
        2: '#68666B'
      }
    }
  },
  components: {
    Input: inputTheme,
    Button: buttonTheme
  }
})

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}