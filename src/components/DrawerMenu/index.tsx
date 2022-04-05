// Vendors
import { useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Components
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  Stack
} from '@chakra-ui/react'
import { Logo } from '../Logo'

// Types
type DrawerMenuProps = {
  isOpen: boolean
  onClose: () => void
  items: Array<{
    label: string
    href: string
  }>
}

type ActiveLinkProps = {
  href: string
  label: string
}

/*
|-----------------------------------------------------------------------------
| Component
|-----------------------------------------------------------------------------
|
|
*/

export const DrawerMenu = (props: DrawerMenuProps) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const { isOpen, onClose, items } = props
  const { asPath } = useRouter()

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
  const ActiveLink = useCallback((props: ActiveLinkProps) => {
    const { href, label } = props

    const isActive = href === window.location.pathname

    return (
      <Link href={href}>
        <a>
          <Flex
            px={6}
            position="relative"
            _before={{
              content: '""',
              width: 5,
              height: 5,
              position: 'absolute',
              left: -2,
              backgroundColor: 'primary.500',
              borderRadius: 'sm',
              transform: isActive ? 'scale(1)' : 'scale(0)',
              transformOrigin: 'left',
              transition: 'all 0.2s'
            }}
            alignItems="center"
          >
            <Text fontSize="lg" color={isActive ? 'gray.50' : 'gray.100'}>
              {label}
            </Text>
          </Flex>
        </a>
      </Link>
    )
  }, [])

  /*
  |-----------------------------------------------------------------------------
  | Effects
  |-----------------------------------------------------------------------------
  |
  |
  */

  useEffect(() => {
    setTimeout(() => {
      onClose()
    }, 300)
  }, [asPath])

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
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />

      <DrawerContent backgroundColor="gray.900">
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Logo />
        </DrawerHeader>

        <DrawerBody px={0} py={6}>
          <Stack direction="column" spacing={6}>
            {items.map((item) => {
              return (
                <ActiveLink
                  key={JSON.stringify(item)}
                  href={item.href}
                  label={item.label}
                />
              )
            })}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
