import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement
} from '@chakra-ui/react'
import React, { forwardRef, ReactElement } from 'react'
import { FieldError } from 'react-hook-form'

// Types
type FieldTextProps = {
  name: string
  label?: string
  error?: FieldError
  inputLeftElement?: ReactElement
  inputRightElement?: ReactElement
} & InputProps

const FieldTextBase: React.ForwardRefRenderFunction<
  HTMLInputElement,
  FieldTextProps
> = (props, ref) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */

  const { name, label, error, inputLeftElement, inputRightElement, ...rest } =
    props

  /*
  |-----------------------------------------------------------------------------
  | Renders
  |-----------------------------------------------------------------------------
  |
  |
  */

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <InputGroup>
        {inputLeftElement && (
          <InputLeftElement
          h="auto"
          w="auto">
            {inputLeftElement}
          </InputLeftElement>
        )}

        <Input
          id={name}
          name={name}
          ref={ref}
          pl={inputLeftElement ? 'auto' : '4'}
          _disabled={{
            opacity: 0.7,
            cursor: 'not-allowed'
          }}
          {...rest}
        />

        {inputRightElement && (
          <InputRightElement h="auto" w="auto">
            {inputRightElement}
          </InputRightElement>
        )}
      </InputGroup>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const FieldText = forwardRef(FieldTextBase)
