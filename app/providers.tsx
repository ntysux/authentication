'use client'

import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ChakraProvider, Divider, Text, extendTheme, useDisclosure } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { decode } from 'jsonwebtoken'
import { buttonTheme } from '@/elements/button'
import { inputTheme } from '@/elements/input'
import { useEffect, useRef, useState } from 'react'

const theme = extendTheme({
  colors: {
    app: {
      black: {
        1: '#49474B',
        2: '#68666B'
      },
      error: {
        1: '#FF677F'
      }
    }
  },
  components: {
    Input: inputTheme,
    Button: buttonTheme
  }
})

interface TokenData {
  id: string,
  username: string,
  iat: number
}

export function Providers({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  const [tokenValue, setTokenValue] = useState<TokenData | undefined>(undefined)

  function handleLogout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
    onClose()
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setTokenValue(decode(token) as TokenData)
      onOpen()
    }
  }, [])

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}

        <AlertDialog
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
          closeOnOverlayClick={false}
        >
          <AlertDialogOverlay bg='rgba(73, 71, 75, 0.7)' />
          <AlertDialogContent
            w='fit-content'
            color='white'
            rounded='xl'
            bg='rgba(53, 51, 55, 0.7)'
            backdropFilter='blur(2px)'
          >
            <AlertDialogHeader
              p='8'
              fontSize='md'
              fontWeight='300'
              letterSpacing='wider'
            >
              Bạn đã đăng nhập dưới tên người dùng <Text as='span' fontWeight='700'>{tokenValue?.username}</Text>
            </AlertDialogHeader>
            <Divider borderColor='whiteAlpha.300' />
            <AlertDialogFooter p='2'>
              <Button
                size='sm'
                w='full'
                variant='un'
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ChakraProvider>
    </CacheProvider>
  )
}