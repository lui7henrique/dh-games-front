import { Box, Text, Badge, Spacer, Flex, VStack } from '@chakra-ui/react'
import { Button } from '../Button/index'

type CardProductProps = {
  title: string
  description: string
  price: number
}

export const CardProduct = ({
  title,
  description,
  price
}: CardProductProps) => {
  return (
    <>
      <Flex bg="white" w="100%" h="32" p={8}>
        <Flex w="100%" alignItems="center" justifyContent="space-between">
          <Box>
            <Text fontSize="xl" color="gray.900">
              {title}
            </Text>
            <Text fontSize="xs" color="gray.800">
              {description}
            </Text>
          </Box>

          <VStack>
            <Badge color="gray.50" bgColor="primary.500" px="12px">
              {price?.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
              })}
            </Badge>
            <Button
              label="Carrinho"
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
          </VStack>
        </Flex>
      </Flex>
    </>
  )
}
