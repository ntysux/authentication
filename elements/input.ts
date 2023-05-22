import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const black = definePartsStyle({
  field: {
    color: 'app.black.2',
    fontSize: 'sm',
    fontWeight: '700',
    borderRadius: '5',
    border: '2px',
    borderColor: 'app.black.1',
    _placeholder: {
      color: 'app.black.2'
    },
    _focus: {
      bg: 'white',
      _placeholder: {
        color: 'rgba(104, 102, 107, 0.4)'
      }
    }
  }
})

export const inputTheme = defineMultiStyleConfig({ 
  variants: {black}
})