import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Components
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useToast
} from '@chakra-ui/react'
import { FieldText } from '../FieldText'

import { sleep } from '../../utils/sleep'
import { schema } from './schema'

// Types
type DrawerAdminProps = {
  isOpen: boolean
  onClose: () => void
}

type DrawerAdminForm = {
  email: string
  password: string
}

export const DrawerAdmin = (props: DrawerAdminProps) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const { isOpen, onClose } = props

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    reset
  } = useForm<DrawerAdminForm>({
    resolver: yupResolver(schema())
  })

  const toast = useToast()

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
    async (data: DrawerAdminForm) => {
      await sleep(5000)

      reset({
        email: '',
        password: ''
      })

      onClose()

      toast({
        title: 'Login feito com sucesso!',
        description: `Bem vindo ${data.email}`,
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    },
    [onClose, reset, toast]
  )

  /*
  |-----------------------------------------------------------------------------
  | Memos
  |-----------------------------------------------------------------------------
  |
  |
  */

  /*
  |-----------------------------------------------------------------------------
  | Effects
  |-----------------------------------------------------------------------------
  |
  |
  */

  /*
  |-----------------------------------------------------------------------------
  | Render
  |-----------------------------------------------------------------------------
  |
  |
  */
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />

      <DrawerContent backgroundColor="gray.900">
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Admin</DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            <FieldText
              label="E-mail"
              placeholder="Insira o e-mail"
              {...register('email')}
              error={errors.email}
            />

            <FieldText
              label="Senha"
              {...register('password')}
              error={errors.password}
              type="password"
              placeholder="Insira a senha"
            />
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>

          <Button onClick={handleSubmit(onSubmit)} isLoading={isSubmitting}>
            Login
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
