import { Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type ActiveLinkProps = {
  href: string
  label: string
}

export const HeaderActiveLink = (props: ActiveLinkProps) => {
  const { href, label } = props

  const { asPath } = useRouter()
  const isActive = href === '/' ? asPath === href : asPath.startsWith(href)

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
            backgroundColor: isActive ? 'primary.500' : 'primary.600',
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
}
