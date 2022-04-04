import { Box, BoxProps, Flex, Text } from '@chakra-ui/react'

type CardFooterProps = {
  label: string
  href: string[]
  isLink?: boolean
} & BoxProps

export const CardFooter = ({ label, href, isLink }: CardFooterProps) => {
  return (
    <>
      <Flex flexDir={'column'} alignItems="flex-start">
        <Flex flexDir={'column'} my={'15px'}>
          <Text color={'#000000'} size={'1rem'} fontWeight={600}>
            {label.toUpperCase()}
          </Text>
          <Box
            w={'34%'}
            borderBottom={'4px solid #3CD3C1'}
            borderRadius={'0.5rem'}
          ></Box>
        </Flex>
        {isLink
          ? (
          <a href="" color="#666666">
            {href.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))}
          </a>
            )
          : (
          <Text>
            {href.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))}
          </Text>
            )}
      </Flex>
    </>
  )
}
