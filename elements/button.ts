import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const out = defineStyle({
  border: '2px',
  borderColor: 'app.black.1',
  color: 'app.black.2',
  fontSize: 'sm',
  fontWeight: '700',
  borderRadius: '5',
  _hover: {
    borderColor: 'app.black.1',
    color: 'app.black.1',
  },
  _loading: {
    cursor: 'default'
  }
})

const sol = defineStyle({
  bg: 'app.black.1',
  color: 'white',
  borderRadius: '5',
  fontSize: 'sm',
  _loading: {
    cursor: 'default',
    opacity: '1',
    _hover: {
      bg: 'app.black.1'
    }
  }
})

const un = defineStyle({
  color: 'white'
}) 

export const buttonTheme = defineStyleConfig({
  variants: {out, sol, un}
})