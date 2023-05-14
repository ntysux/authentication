'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Input } from "@chakra-ui/react"
import { IconArrowNarrowRight } from "@tabler/icons-react"

export default function Auth() {
  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
    >
      <Card minW={{sm: 'md', base: 'auto'}} boxShadow='base'>
        <CardHeader>
          <Heading
            size='xs'
            fontFamily='Quicksand'
            color='app.black.2'
          >
            Đăng nhập / Đăng kí
          </Heading>
        </CardHeader>
        <CardBody pb='0'>
          <Input
            variant='black'
            placeholder='Tên đăng nhập'  
          />
        </CardBody>
        <CardFooter justify='right'>
          <Button
            size={{sm: 'md', base: 'sm'}}
            variant='out'
            rightIcon={<IconArrowNarrowRight size='20px' />} 
          >
            Tiếp theo
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  )
}