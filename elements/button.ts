import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const out = defineStyle({
  border: '2px',
  borderColor: 'app.black.2',
  color: 'app.black.2',
  fontSize: 'sm',
  fontWeight: '700',
  borderRadius: '5',
  _hover: {
    borderColor: 'app.black.1',
    color: 'app.black.1',
  }
})

export const buttonTheme = defineStyleConfig({
  variants: { out }
})