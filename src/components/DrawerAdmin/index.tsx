import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Components
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack
} from '@chakra-ui/react'
import { FieldText } from '../FieldText'

import { schema } from './schema'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router'
import { Button } from '../Button'

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

  const { login } = useAuth()
  const { push } = useRouter()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    reset
  } = useForm<DrawerAdminForm>({
    resolver: yupResolver(schema())
  })

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
      const session = await login(data.email, data.password)

      if (session) {
        onClose()

        reset({
          email: '',
          password: ''
        })

        push('/admin')
      }
    },
    [login, onClose, push, reset]
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
          <Button label="Cancelar" variant="outline" mr={3} onClick={onClose} />

          <Button
            label="Login"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
