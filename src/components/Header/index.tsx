import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'

import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useDisclosure,
  useTheme
} from '@chakra-ui/react'

import { IoLogoGameControllerA } from 'react-icons/io'
import { FaLock, FaShoppingCart } from 'react-icons/fa'

import Link from 'next/link'
import { Limiter } from '../Limiter'
import { DrawerAdmin } from '../DrawerAdmin'

type ActiveLinkProps = {
  href: string
  label: string
}

export const Header = () => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const { colors } = useTheme()
  const { asPath, push } = useRouter()

  const { isOpen, onOpen, onClose } = useDisclosure()

  /*
  |-----------------------------------------------------------------------------
  | States
  |-----------------------------------------------------------------------------
  |
  |
  */

  /*
  |-----------------------------------------------------------------------------
  | Functions / Components
  |-----------------------------------------------------------------------------
  |
  |
  */

  const Logo = useCallback(() => {
    return (
      <Flex alignItems="center">
        <IoLogoGameControllerA size={40} color={colors.primary['500']} />
        <Heading size="2rem" ml="2">
          digital games
        </Heading>
      </Flex>
    )
  }, [colors])

  const ActiveLink = useCallback(
    (props: ActiveLinkProps) => {
      const { href, label } = props

      const isActive = asPath === href

      return (
        <Link key={href} href={href}>
          <a>
            <Text
              size="sm"
              mr="4"
              color={isActive ? 'gray.50' : 'gray.100'}
              transition="color 0.2s"
              _after={{
                display: 'block',
                content: '""',
                width: isActive ? '100%' : '0',
                height: '3px',
                backgroundColor: colors.primary['500'],
                transition: '0.2s ease-in-out',
                borderRadius: '3px'
              }}
              _hover={{
                color: 'gray.50',
                _after: {
                  width: '100%'
                }
              }}
            >
              {label}
            </Text>
          </a>
        </Link>
      )
    },
    [asPath, colors]
  )

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
                <ActiveLink
                  key={JSON.stringify(item)}
                  href={item.href}
                  label={item.label}
                />
              )
            })}
          </Flex>
        </Stack>

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
            onClick={onOpen}
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
      <DrawerAdmin isOpen={isOpen} onClose={onClose} />
    </>
  )
}
