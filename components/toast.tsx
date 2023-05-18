import { Box, HStack, Text } from "@chakra-ui/react"

export default function Toast({children}: {children: string}) {
  return (
    <HStack
      mb='2'
      p='3'
      spacing='3'
      bg='app.black.1'
      color='white'
      borderRadius='8'
    >
      <Box
        p='1'
        bg='app.error.1'
        rounded='full'
      />
      <Text fontSize='sm'>
        {children}
      </Text>
    </HStack>
  )
}