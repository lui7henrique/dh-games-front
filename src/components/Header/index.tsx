import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'

import { Button, Flex, Heading, Stack, Text, useTheme } from '@chakra-ui/react'

import { IoLogoGameControllerA } from 'react-icons/io'
import { FaLock, FaShoppingCart } from 'react-icons/fa'

import Link from 'next/link'

type ActiveLinkProps = {
  href: string
  label: string
}

export const Header = () => {
  const { colors } = useTheme()
  const { asPath, push } = useRouter()

  const Logo = useCallback(() => {
    return (
      <Flex alignItems="center">
        <IoLogoGameControllerA size={40} color={colors.blue['500']} />
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
            <Text size="sm" mr="4" color={isActive ? 'gray.50' : 'gray.100'}>
              {label}
            </Text>
          </a>
        </Link>
      )
    },
    [asPath]
  )

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

  return (
    <>
      <Flex
        maxWidth="1280"
        mx="auto"
        h="5rem"
        alignItems="center"
        justifyContent="space-between"
        px="4"
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
          >
            Admin
          </Button>

          <Button
            backgroundColor="blue.500"
            color="gray.50"
            _hover={{
              backgroundColor: 'blue.600'
            }}
            leftIcon={<FaShoppingCart size={14} color="white" />}
            size="sm"
            borderRadius="sm"
            onClick={() => push('/cart')}
          >
            Carrinho
          </Button>
        </Stack>
      </Flex>
    </>
  )
}
