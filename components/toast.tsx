import { Box, HStack, Text } from "@chakra-ui/react"

export default function Toast() {
  return (
    <HStack
      spacing='3'
      p='3'
      bg='app.black.1'
      color='white'
      borderRadius='8'
    >
      <Box
        p='1'
        bg='#FF677F'
        rounded='full'
      />
      <Text fontSize='sm'>
        Mật khẩu không chính xác
      </Text>
    </HStack>
  )
}