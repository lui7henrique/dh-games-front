import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

import { Flex, IconButton, Stack, useDisclosure } from '@chakra-ui/react'
import { Limiter } from '../Limiter'
import { DrawerAdmin } from '../DrawerAdmin'
import { DrawerMenu } from '../DrawerMenu'
import { Logo } from '../Logo'
import { HeaderActiveLink } from '../HeaderActiveLink'

import { IoMdMenu } from 'react-icons/io'
import { FaLock, FaShoppingCart } from 'react-icons/fa'
import { CgLogOut } from 'react-icons/cg'
import { MdRemoveShoppingCart, MdShoppingCart } from 'react-icons/md'

import { Button } from '../Button'

export const Header = () => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const { push } = useRouter()

  const {
    isOpen: isOpenDrawerAdmin,
    onOpen: onOpenDrawerAdmin,
    onClose: onCloseDrawerAdmin
  } = useDisclosure()

  const {
    isOpen: isOpenDrawerMenu,
    onOpen: onOpenDrawerMenu,
    onClose: onCloseDrawerMenu
  } = useDisclosure()

  const { token, logout } = useAuth()
  const { cart } = useCart()

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

  /*
  |-----------------------------------------------------------------------------
  | Memos
  |-----------------------------------------------------------------------------
  |
  |
  */

  const menu = useMemo(
    () => [
      {
        label: 'Home',
        href: '/'
      },
      {
        label: 'Produtos',
        href: '/products'
      },
      {
        label: 'Sobre nós',
        href: '/about-us'
      }
    ],
    []
  )

  /*
  |-----------------------------------------------------------------------------
  | Effects
  |-----------------------------------------------------------------------------
  |
  |
  */
  useEffect(() => {
    if (token) {
      !menu.some((item) => item.label === 'Gerenciar produtos') &&
        menu.push({
          label: 'Gerenciar produtos',
          href: '/admin'
        })
    }

    if (!token) {
      const adminTabIndex = menu.findIndex(
        (item) => item.label === 'Gerenciar produtos'
      )

      if (adminTabIndex !== -1) {
        menu.splice(adminTabIndex, 1)
      }
    }
  }, [token, menu])

  /*
  |-----------------------------------------------------------------------------
  | Render
  |-----------------------------------------------------------------------------
  |
  |
  */

  return (
    <>
      <Limiter
        d="flex"
        h="5rem"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack
          direction="row"
          spacing="4"
          alignItems="center"
          userSelect="none"
          display={{ base: 'none', md: 'flex' }}
        >
          <Logo />

          <Flex
            px="4"
            borderLeftWidth="1px"
            borderLeftStyle="solid"
            borderLeftColor="gray.800"
          >
            {menu.map((item) => {
              return (
                <HeaderActiveLink
                  key={JSON.stringify(item)}
                  href={item.href}
                  label={item.label}
                />
              )
            })}
          </Flex>
        </Stack>

        <IconButton
          aria-label="Open menu"
          display={{
            base: 'flex',
            md: 'none'
          }}
          borderRadius="sm"
          size="md"
          onClick={onOpenDrawerMenu}
        >
          <IoMdMenu size={24} />
        </IconButton>

        <Stack direction="row" spacing="4" alignItems="center">
          <Flex size="sm" position="relative">
            <IconButton
              aria-label="Open cart"
              label="Carrinho"
              color="gray.50"
              _hover={{
                backgroundColor: 'primary.600'
              }}
              icon={<MdShoppingCart color="white" size={16} />}
              borderRadius="full"
              onClick={() => push('/cart')}
            />
            {!!cart.length && (
              <Flex
                w="3.5"
                h="3.5"
                position="absolute"
                top={0}
                right={0}
                bgColor="white"
                borderRadius="full"
                alignItems="center"
                justifyContent="center"
                color="white"
                backgroundColor="gray.800"
                fontSize="8px"
                fontWeight="bold"
              >
                {cart.length}
              </Flex>
            )}
          </Flex>

          {token ? (
            <Button
              label="Sair"
              backgroundColor="transparent"
              color="gray.50"
              _hover={{
                backgroundColor: 'transparent'
              }}
              leftIcon={<CgLogOut size={18} color="white" />}
              size="sm"
              borderRadius="sm"
              onClick={logout}
            />
          ) : (
            <Button
              backgroundColor="transparent"
              color="gray.50"
              _hover={{
                backgroundColor: 'transparent'
              }}
              leftIcon={<FaLock size={14} color="white" />}
              size="sm"
              borderRadius="sm"
              onClick={token ? () => push('/admin') : onOpenDrawerAdmin}
              label="Admin"
            />
          )}
        </Stack>
      </Limiter>

      <DrawerAdmin isOpen={isOpenDrawerAdmin} onClose={onCloseDrawerAdmin} />
      <DrawerMenu
        isOpen={isOpenDrawerMenu}
        onClose={onCloseDrawerMenu}
        items={menu}
      />
    </>
  )
}
