'use client'

import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Heading, Input, Stack, Text, useBoolean, useDisclosure, useToast } from "@chakra-ui/react"
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { string, boolean } from 'yup'
import Toast from "@/components/toast"
import Link from "next/link"

export default function Client({
  isUser, username
}: {
  isUser: boolean, username: string
}) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  const toast = useToast()
  const [loading, setLoading] = useBoolean(false)
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const url = process.env.NEXT_PUBLIC_APP_URL

  useEffect(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus()
    }
  }, [])

  // set Password
  const handleSetPassword = (event: ChangeEvent<HTMLInputElement>) => 
    setPassword(event.target.value)

  // set Password Confirm
  const handleSetPasswordConfirm = (event: ChangeEvent<HTMLInputElement>) => 
    setPasswordConfirm(event.target.value)

  function handleLoginKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if(event.key === 'Enter' && password) {
      handleLoginValidate()
    }
  }

  function handleLogupKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if(event.key === 'Enter' && password && passwordConfirm) {
      handleLogupValidate()
    }
  }

  async function handleLoginValidate() {
    setLoading.on()

    // call API for check password
    const res = await fetch(`${url}/${username}/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({auth: true, username, password})
    })
    
    const {result, token} = await res.json()
    
    const validationSchema = boolean().test('match', 'Mật khẩu không đúng', value => value === true)
    
    try {
      await validationSchema.validate(result)
      localStorage.setItem('token', token)
    } catch (error: any) {
      setLoading.off()
      toast({
        position: 'bottom',
        duration: 2000,
        render: () => <Toast>{error.errors[0]}</Toast>
      })
    }
  }

  async function handleLogupValidate() {
    setLoading.on()

    const validationSchema = string().test('match', 'Mật khẩu không khớp', value => value === password)

    try {
      await validationSchema.validate(
        passwordConfirm,
        {abortEarly: false, context: {password, passwordConfirm}}
      )
      
      // call API for create new account
      const res = await fetch(`${url}/${username}/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({auth: false, username, password})
      })

      const {pageId} = await res.json()
      
      // open dialog back to login if pageId is ready
      if (pageId) {
        onOpen()
        setLoading.off()
      }
      
    } catch (error: any) {
      setLoading.off()
      toast({
        position: 'bottom',
        duration: 2000,
        render: () => <Toast>{error.errors[0]}</Toast>
      })
    }
  }

  return isUser ? (
    // Login
    <Flex
      minH='100vh'
      align='center'
      justify='center'
    >
      <Card w={{xl: 'md', base: 'md'}} mx='4'>
        <CardHeader>
          <Stack spacing='4'>
            <Heading
              fontFamily='Quicksand'
              size='sm'
              color='app.black.2'
            >
              Đăng nhập
            </Heading>
            <Box
              color='rgba(104, 102, 107, 0.5)'
              fontWeight='600'
              fontSize='sm'
            >
              <Text>
                Nhập mật khẩu cho tài khoản <Text as='span' fontWeight='700' color='app.black.2'>{username}</Text>
              </Text>
            </Box>
          </Stack>
        </CardHeader>
        <CardBody pb='0'>
          <Input
            ref={passwordInputRef}
            value={password}
            type='password'
            size='lg'
            variant='black'
            placeholder='Mật khẩu'
            onChange={ e => handleSetPassword(e)}
            onKeyDown={e => handleLoginKeyDown(e)}
          />
        </CardBody>
        <CardFooter justify='right'>
          <Button
            isDisabled={!Boolean(password)}
            isLoading={loading}
            variant='unBl' 
            onClick={handleLoginValidate}
          >
            Hoàn tất
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  ) : (
    // Logup
    <Flex
      minH='100vh'
      align='center'
      justify='center'
    >
      <Card w={{xl: 'md', base: 'md'}} mx='4'>
        <CardHeader>
          <Stack spacing='4'>
            <Heading
              fontFamily='Quicksand'
              size='sm'
              color='app.black.2'
            >
              Đăng kí
            </Heading>
            <Box
              color='rgba(104, 102, 107, 0.5)'
              fontWeight='600'
              fontSize='sm'
            >
              <Text>
                Tên tài khoản <Text as='span' fontWeight='700' color='app.black.2'>{username}</Text> chưa tồn tại
              </Text>
              <Text>nhập mật khẩu phía dưới để đăng kí tài khoản mới.</Text>
            </Box>
          </Stack>
        </CardHeader>
        <CardBody pb='0'>
          <Stack>
            <Input
              ref={passwordInputRef}
              value={password}
              type='password'
              size='lg'
              variant='black'
              placeholder='Mật khẩu'
              onChange={e => handleSetPassword(e)}
              onKeyDown={e => handleLogupKeyDown(e)}
            />
            <Input
              value={passwordConfirm}
              type='password'
              size='lg'
              variant='black'
              placeholder='Nhập lại mật khẩu'
              onChange={e => handleSetPasswordConfirm(e)}
              onKeyDown={e => handleLogupKeyDown(e)}
            />
          </Stack>
        </CardBody>
        <CardFooter justify='right'>
          <Button
            isDisabled={!Boolean(password) || !Boolean(passwordConfirm)}
            isLoading={loading}
            variant='unBl'
            onClick={handleLogupValidate}
          >
            Hoàn tất
          </Button>
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
                Tạo tài khoản thành công
              </AlertDialogHeader>
              <Divider borderColor='whiteAlpha.300' />
              <AlertDialogFooter p='2'>
                <Button
                  as={Link}
                  href='/'
                  replace
                  size='sm'
                  w='full'
                  variant='un'
                >
                  Đăng nhập
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </Flex>
  )
}