import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const unBl = defineStyle({
  color: 'app.black.1',
  fontSize: 'sm',
  fontWeight: '700',
  _loading: {
    cursor: 'default'
  }
})

const sol = defineStyle({
  bg: 'app.black.1',
  color: 'white',
  fontSize: 'sm',
  fontWeight: '700',
  _loading: {
    cursor: 'default',
    _hover: {
      bg: 'app.black.1'
    }
  }
})

const unWh = defineStyle({
  color: 'white'
}) 

export const buttonTheme = defineStyleConfig({
  variants: {unBl, sol, unWh}
})