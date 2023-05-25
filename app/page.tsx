'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Input, useBoolean } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { ChangeEvent, KeyboardEvent, useState } from "react"

export default function Auth() {
  const [loading, setLoading] = useBoolean(false)
  const [username, setUsername] = useState<string>('')
  const router = useRouter()

  function handleSetUsername(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value.trim())
  }

  async function handleNextPage() {
    router.push(`/${username}?timestamp=${new Date().getTime()}`)
    setLoading.on()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if(event.key === 'Enter' && username) {
      handleNextPage()
    }
  }

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
    >
      <Card 
        mx='4'
        w={{xl: 'md', base: 'md'}}
      >
        <CardHeader>
          <Heading
            size='sm'
            fontFamily='Quicksand'
            color='app.black.1'
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
            onKeyDown={e => handleKeyDown(e)}
          />
        </CardBody>
        <CardFooter justify='right'>
          <Button
            isDisabled={!Boolean(username)}
            isLoading={loading}
            variant='unBl'
            onClick={handleNextPage}
          >
            Tiếp theo
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  )
}