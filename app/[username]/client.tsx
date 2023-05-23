'use client'

import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Heading, Input, Stack, Text, useBoolean, useDisclosure, useToast } from "@chakra-ui/react"
import { ChangeEvent, useRef, useState } from "react"
import { object, string, boolean } from 'yup'
import Toast from "@/components/toast"
import Link from "next/link"

export default function Client({
  isUser, username
}: {
  isUser: boolean, username: string
}) {

  const [done, setDone] = useBoolean(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  const toast = useToast()
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')

  const handleSetPassword = (event: ChangeEvent<HTMLInputElement>) => 
    setPassword(event.target.value)

  const handleSetPasswordConfirm = (event: ChangeEvent<HTMLInputElement>) => 
    setPasswordConfirm(event.target.value)

  async function handleLoginValidate() {
    setDone.on()
    const validationSchema1 = string().required('Vui lòng nhập mật khẩu')

    try {
      const validData = await validationSchema1.validate(password)

      // call API for check password
      const res = await fetch(`http://localhost:3000/${username}/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({auth: true, username, password})
      })

      const {result, token} = await res.json()
      console.log(token)

      const validationSchema2 = boolean().test('match', 'Mật khẩu không đúng', value => value === true)
  
      try {
        const validData = await validationSchema2.validate(result)
        localStorage.setItem('token', token)

      } catch (error: any) {
        setDone.off()
        toast({
          position: 'top',
          duration: 2000,
          render: () => <Toast>{error.errors[0]}</Toast>
        })
      }

    } catch (error: any) {
      setDone.off()
      toast({
        position: 'top',
        duration: 2000,
        render: () => <Toast>{error.errors[0]}</Toast>
      })
    }
  
  }

  async function handleLogupValidate() {
    setDone.on()
    const validationSchema = object().shape({
      password: string()
        .required('Vui lòng nhập mật khẩu'),
      passwordConfirm: string()
        .required('Vui lòng xác thực mật khẩu')
        .test('match', 'Mật khẩu không khớp', value => value === password)
    }) 

    try {
      await validationSchema.validate(
        {password, passwordConfirm}, 
        {abortEarly: false, context: {password, passwordConfirm}}
      )
      
      // call API for create new account
      const res = await fetch(`http://localhost:3000/${username}/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({auth: false, username, password})
      })

      const {pageId} = await res.json()
      if (pageId) {
        onOpen()
        setDone.off()
      }
      
    } catch (error: any) {
      setDone.off()
      toast({
        position: 'top',
        duration: 2000,
        render: () => error.errors
          .reverse()
          .map((err: string, index: number) => 
            <Toast key={index}>{err}</Toast>
          )
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
      <Card minW={{sm: 'md', base: 'auto'}}>
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
            value={password}
            type='password'
            size='lg'
            variant='black'
            placeholder='Mật khẩu'
            onChange={ e => handleSetPassword(e)}
          />
        </CardBody>
        <CardFooter justify='right'>
          <Button 
            isLoading={done}
            variant='sol' 
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
      <Card minW={{sm: 'md', base: 'auto'}}>
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
              <Text>đăng kí bằng cách nhập mật khẩu phía dưới.</Text>
            </Box>
          </Stack>
        </CardHeader>
        <CardBody pb='0'>
          <Stack>
            <Input
              value={password}
              type='password'
              size='lg'
              variant='black'
              placeholder='Mật khẩu'
              onChange={e => handleSetPassword(e)}
            />
            <Input
              value={passwordConfirm}
              type='password'
              size='lg'
              variant='black'
              placeholder='Nhập lại mật khẩu'
              onChange={e => handleSetPasswordConfirm(e)}
            />
          </Stack>
        </CardBody>
        <CardFooter justify='right'>
          <Button
            isLoading={done}
            variant='sol'
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