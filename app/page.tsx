'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Input } from "@chakra-ui/react"

export default function Auth() {
  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
    >
      <Card minW={{sm: 'md', base: 'auto'}}>
        <CardHeader>
          <Heading
            size='sm'
            fontFamily='Quicksand'
            color='app.black.2'
          >
            Đăng nhập / Đăng kí
          </Heading>
        </CardHeader>
        <CardBody pb='0'>
          <Input
            size='lg'
            variant='black'
            placeholder='Tên đăng nhập'  
          />
        </CardBody>
        <CardFooter justify='right'>
          <Button variant='out'>
            Tiếp theo
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  )
}