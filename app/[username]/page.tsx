'use client'

import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react"

export default function Complete() {
  const x: boolean = true

  return x ? (
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
              <Text>Tên tài khoản đã tồn tại</Text>
              <Text>nhập mật khẩu để đăng nhập.</Text>
            </Box>
          </Stack>
        </CardHeader>
        <CardBody pb='0'>
          <Input
            type='password'
            size='lg'
            variant='black'
            placeholder='Mật khẩu'
          />
        </CardBody>
        <CardFooter justify='right'>
          <Button variant='sol'>
            Hoàn tất
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  ) : (
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
              <Text>Tên tài khoản chưa tồn tại</Text>
              <Text>đăng kí bằng cách nhập mật khẩu phía dưới.</Text>
            </Box>
          </Stack>
        </CardHeader>
        <CardBody pb='0'>
          <Stack>
            <Input
              type='password'
              size='lg'
              variant='black'
              placeholder='Mật khẩu'
            />
            <Input
              type='password'
              size='lg'
              variant='black'
              placeholder='Nhập lại mật khẩu'
            />
          </Stack>
        </CardBody>
        <CardFooter justify='right'>
          <Button variant='sol'>
            Hoàn tất
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  )
}