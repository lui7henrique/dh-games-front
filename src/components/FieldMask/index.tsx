import {
  chakra,
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
import InputMask from 'react-input-mask'

// Types
type FieldMaskProps = {
  name: string
  label?: string
  error?: FieldError
  inputLeftElement?: ReactElement
  inputRightElement?: ReactElement
  mask?: string
} & InputProps

const ChakraInputMask = chakra(InputMask as any)

const FieldMaskBase: React.ForwardRefRenderFunction<
  HTMLInputElement,
  FieldMaskProps
> = (props, ref): any => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */

  const {
    name,
    label,
    error,
    inputLeftElement,
    inputRightElement,
    mask,
    ...rest
  } = props

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
          <InputLeftElement>{inputLeftElement}</InputLeftElement>
        )}

        <Input
          as={ChakraInputMask}
          mask={mask}
          id={name}
          name={name}
          ref={ref}
          pl={inputLeftElement ? 'auto' : '4'}
          borderRadius="3px"
          _disabled={{
            opacity: 0.7,
            cursor: 'not-allowed'
          }}
          {...rest}
        />

        {inputRightElement && (
          <InputRightElement>{inputRightElement}</InputRightElement>
        )}
      </InputGroup>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const FieldMask = forwardRef(FieldMaskBase)
