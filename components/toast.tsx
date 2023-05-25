import { Box, HStack, Text } from "@chakra-ui/react"

export default function Toast({children}: {children: string}) {
  return (
    <HStack
      p='4'
      spacing='4'
      bg='app.black.1'
      color='white'
      rounded='lg'
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