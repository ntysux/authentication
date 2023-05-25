import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const unBl = defineStyle({
  color: 'app.black.1',
  fontSize: 'sm',
  fontWeight: '700',
  _loading: {
    cursor: 'default'
  },
  _disabled: {
    cursor: 'default'
  }
})

const unWh = defineStyle({
  color: 'white'
}) 

export const buttonTheme = defineStyleConfig({
  variants: {unBl, unWh}
})