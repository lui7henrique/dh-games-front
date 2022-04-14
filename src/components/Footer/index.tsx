import { Box, Flex, Text, useTheme } from '@chakra-ui/react'
import { useCallback, useMemo } from 'react'
import { IoLogoGameControllerA } from 'react-icons/io'
import { CardFooter } from '../CardFooter'
import { Limiter } from '../Limiter'

export const Footer = () => {
  const { colors } = useTheme()

  const menu = useMemo(
    () => [
      {
        label: 'Contact Us',
        href: ['digitalgames@dh.com', '+55 21 987127492'],
        isLink: false
      },
      {
        label: 'Follow Us',
        href: ['Instagram', 'Twitter', 'Youtube', 'Facebook'],
        isLink: true
      },
      {
        label: 'Links',
        href: ['Home', 'Store', 'Discover'],
        isLink: true
      },
      {
        label: 'Location',
        href: ['Rua 7 de Maio', '527 - 89020330', 'Rio de Janeiro, Brasil'],
        isLink: false
      }
    ],
    []
  )

  const Logo = useCallback(() => {
    return (
      <Flex align="center">
        <IoLogoGameControllerA size={40} color={colors.primary['500']} />
        <Text size="2rem" ml="2" color={'#2B2B2B'}>
          digital games
        </Text>
      </Flex>
    )
  }, [colors])

  return (
    <Box bgColor={'#FAFAFA'} h="auto" mt="100px" py="8">
      <Limiter>
        <Flex
          flexDir="column"
          justify="center"
          align={'space-arround'}
          h="auto"
        >
          <Flex w={'100%'} justifyContent="flex-start">
            {Logo()}
          </Flex>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            fontSize={'14px'}
            lineHeight={'21px'}
            color={'#666666'}
            width={'100%'}
            justifyContent="space-between"
          >
            {menu.map((item, index) => (
              <CardFooter
                key={index}
                label={item.label}
                href={item.href}
                isLink={item.isLink}
                alignItems="center"
                h={'calc(100% - 18px)'}
              />
            ))}
          </Flex>
        </Flex>
        <Text
          fontWeight={'400'}
          fontSize={'12px'}
          lineHeight={'18px'}
          color={'#666666;'}
          height={'18px'}
          textAlign="center"
          marginBottom={'18px'}
          mt="8"
        >
          Copyright (Digital Games 2022 © Todos os Direitos Reservados)
        </Text>
      </Limiter>
    </Box>
  )
}
