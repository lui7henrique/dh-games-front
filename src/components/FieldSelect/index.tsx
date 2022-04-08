import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Select,
  SelectProps
} from '@chakra-ui/react'
import React, { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

type Option = {
  label: string
  value: string
}

// Types
type FieldSelectProps = {
  name: string
  label?: string
  error?: FieldError
  options: Option[]
} & SelectProps

const FieldSelectBase: React.ForwardRefRenderFunction<
  HTMLSelectElement,
  FieldSelectProps
> = (props, ref) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */

  const { name, label, error, options, ...rest } = props

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
        <Select
          id={name}
          name={name}
          ref={ref}
          borderRadius="3px"
          _disabled={{
            opacity: 0.7,
            cursor: 'not-allowed'
          }}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </InputGroup>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const FieldSelect = forwardRef(FieldSelectBase)
