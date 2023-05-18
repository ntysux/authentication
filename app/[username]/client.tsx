'use client'

import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Input, Stack, Text, useToast } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"
import { object, string } from 'yup'
import Toast from "@/components/toast"

export default function Client({
  isUser,
  account
}: {
  isUser: boolean,
  account: {username: string, password: string}
}) {
  const {username: accountUsername, password: accountPassword} = account
  const toast = useToast()
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')

  const handleSetPassword = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
  const handleSetPasswordConfirm = (event: ChangeEvent<HTMLInputElement>) =>setPasswordConfirm(event.target.value)

  async function LoginValidate() {
    const validationSchema = object().shape({
      password: string().required('Vui lòng nhập mật khẩu')
    })

    try {
      const validData = await validationSchema.validate({password})
    } catch (error: any) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => <Toast>{error.errors[0]}</Toast>
      })
    }
  }

  async function LogupValidate() {
    const validationSchema = object().shape({
      password: string().required('Vui lòng nhập mật khẩu'),
      passwordConfirm: string().required('Vui lòng xác thực mật khẩu')
    })

    try {
      const validData = await validationSchema.validate({password, passwordConfirm}, { abortEarly: false })
    } catch (error: any) {
      toast({
        position: 'top',
        duration: 2000,
        render: () => 
          error.errors
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
                Tên tài khoản <Text as='span' fontWeight='700' color='app.black.2'>{accountUsername}</Text> đã tồn tại
              </Text>
              <Text>nhập mật khẩu để đăng nhập.</Text>
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
          <Button variant='sol' onClick={LoginValidate}>
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
                Tên tài khoản <Text as='span' fontWeight='700' color='app.black.2'>{accountUsername}</Text> chưa tồn tại
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
          <Button variant='sol' onClick={LogupValidate}>
            Hoàn tất
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  )
}