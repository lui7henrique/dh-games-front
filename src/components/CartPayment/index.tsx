// Vendors

// Components
import { InfoIcon } from '@chakra-ui/icons'
import { Box, Heading, HStack, Text, Tooltip, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { sleep } from '../../utils/sleep'
import { Button } from '../Button'
import { FieldMask } from '../FieldMask'
import { FieldText } from '../FieldText'
import { schema } from './schema'
import { CartPaymentForm } from './types'

// Types
export type CartPaymentProps = {}

/*
|-----------------------------------------------------------------------------
| Component
|-----------------------------------------------------------------------------
|
|
*/

export const CartPayment = (props: CartPaymentProps) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<CartPaymentForm>({
    resolver: yupResolver(schema())
  })

  const { push } = useRouter()

  /*
  |-----------------------------------------------------------------------------
  | States
  |-----------------------------------------------------------------------------
  |
  |
  */

  /*
  |-----------------------------------------------------------------------------
  | Functions
  |-----------------------------------------------------------------------------
  |
  |
  */
  const onSubmit = useCallback(
    async (values: CartPaymentForm) => {
      await sleep(1500)

      push('/cart/success')
    },
    [push]
  )

  /*
  |-----------------------------------------------------------------------------
  | Effects
  |-----------------------------------------------------------------------------
  |
  |
  */

  /*
  |-----------------------------------------------------------------------------
  | Memos
  |-----------------------------------------------------------------------------
  |
  |
  */

  /*
  |-----------------------------------------------------------------------------
  | Renders
  |-----------------------------------------------------------------------------
  |
  |
  */
  return (
    <Box
      w="100%"
      as="aside"
      position="sticky"
      top={4}
      bgColor="#171717"
      p={4}
      borderRadius="sm"
    >
      <VStack
        spacing={4}
        alignItems="flex-start"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <HStack spacing={2}>
          <Heading as="h3" fontSize="sm">
            Pagamento
          </Heading>

          <Tooltip label="Essa é uma aplicação teste e a compra não será efetuada em nenhum momento. Evite preencher formulários com dados verídicos. 😉">
            <InfoIcon w={4} h={4} color="primary.500" />
          </Tooltip>
        </HStack>

        <Text fontSize="xs">
          Por enquanto, o único método de pagamento possível é cartão de
          crédito.
        </Text>

        <FieldMask
          label="Número do cartão:"
          size="sm"
          mask="9999 9999 9999 9999"
          error={errors.cardNumber}
          {...register('cardNumber')}
        />
        <FieldMask
          label="Data de validade:"
          mask="99/99"
          size="sm"
          error={errors.cardExpiration}
          {...register('cardExpiration')}
        />
        <FieldMask
          label="Código de segurança:"
          mask="999"
          size="sm"
          error={errors.cardSecurityCode}
          {...register('cardSecurityCode')}
        />
        <FieldText
          label="Nome no titular"
          size="sm"
          error={errors.cardHolderName}
          {...register('cardHolderName')}
        />
        <FieldMask
          label="CPF do titular"
          mask="999.999.999-99"
          size="sm"
          error={errors.cardHolderCPF}
          {...register('cardHolderCPF')}
        />

        <Button
          label="Finalizar compra"
          w="100%"
          type="submit"
          isLoading={isSubmitting}
        />
      </VStack>
    </Box>
  )
}
