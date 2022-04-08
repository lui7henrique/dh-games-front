import { Box, Text, Badge, Spacer, Flex, Button } from '@chakra-ui/react'
// import { Button } from '../Button'

type CardProductProps = {
  titulo: string
  descricao: string
  preco: number
}

export const CardProduct = ({ titulo, descricao, preco }: CardProductProps) => {
  return (
    <>
      <Flex bg="white" w="100%" h="16 rem" columns={{ sm: 2, md: 4 }} top="500">
        <Flex border="red 2px" w="100%">
          <Box p={46}>
            <Text fontSize="xl" color="gray.900">
              {titulo}
            </Text>
            <Text fontSize="xs" color="gray.800">
              {descricao}
            </Text>
          </Box>
          <Spacer />
          <Box p={46}>
            {' '}
            <Badge color="gray.50" bgColor="primary.500" px="12px">
              {preco?.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
              })}
            </Badge>
          </Box>
        </Flex>
        <Flex bottom={0}>
          <Button
            backgroundColor="primary.500"
            color="gray.50"
            _hover={{
              backgroundColor: 'primary.600'
            }}
            // leftIcon={<FaShoppingCart size={14} color="white" />}
            size="sm"
            borderRadius="sm"
            // onClick={() => push('/cart')}
          >
            Carrinho
          </Button>
        </Flex>
      </Flex>
    </>
  )
}
