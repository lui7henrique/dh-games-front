import { useMemo } from 'react'
import { useRouter } from 'next/router'

import {
  Button,
  Flex,
  IconButton,
  Stack,
  useDisclosure
} from '@chakra-ui/react'

import { IoMdMenu } from 'react-icons/io'
import { FaLock, FaShoppingCart } from 'react-icons/fa'

import { Limiter } from '../Limiter'
import { DrawerAdmin } from '../DrawerAdmin'
import { DrawerMenu } from '../DrawerMenu'
import { Logo } from '../Logo'
import { HeaderActiveLink } from '../HeaderActiveLink'

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

        <Stack direction="row" spacing="4">
          <Button
            backgroundColor="transparent"
            color="gray.50"
            _hover={{
              backgroundColor: 'transparent'
            }}
            leftIcon={<FaLock size={14} color="white" />}
            size="sm"
            borderRadius="sm"
            onClick={onOpenDrawerAdmin}
          >
            Admin
          </Button>

          <Button
            backgroundColor="primary.500"
            color="gray.50"
            _hover={{
              backgroundColor: 'primary.600'
            }}
            leftIcon={<FaShoppingCart size={14} color="white" />}
            size="sm"
            borderRadius="sm"
            onClick={() => push('/cart')}
          >
            Carrinho
          </Button>
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
