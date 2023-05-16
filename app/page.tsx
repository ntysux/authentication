'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Input } from "@chakra-ui/react"
import Link from "next/link"
import { ChangeEvent, useState } from "react"

export default function Auth() {
  const [username, setUsername] = useState<string>('')

  function handleSetUsername(event: ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value
    setUsername(value.trim())
  }

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
            value={username}
            size='lg'
            variant='black'
            placeholder='Tên đăng nhập'
            onChange={e => handleSetUsername(e)}  
          />
        </CardBody>
        <CardFooter justify='right'>
          <Button
            variant='out'
            as={Link}
            href={`/${username}`}
          >
            Tiếp theo
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  )
}