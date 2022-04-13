import { Box, Text, Badge, Flex, VStack } from '@chakra-ui/react'
import { FaShoppingCart } from 'react-icons/fa'
import { MdRemoveShoppingCart, MdShoppingCart } from 'react-icons/md'
import { useCart } from '../../context/CartContext'
import { Button } from '../Button/index'

type CardProductProps = {
  id: string
  title: string
  description: string
  price: number
}

export const CardProduct = ({
  id,
  title,
  description,
  price
}: CardProductProps) => {
  const {
    loading,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    hasProductOnCart
  } = useCart()

  const hasProduct = hasProductOnCart(id)

  console.log(hasProduct)

  return (
    <>
      <Flex
        bg="white"
        direction="column"
        justifyContent="space-between"
        w="100%"
        h="auto"
        minH="20vh"
        p={8}
      >
        <Flex w="100%" alignItems="flex-start" justifyContent="space-between">
          <VStack spacing={4} alignItems="flex-start">
            <Flex justifyContent="space-between" alignItems="center" w="100%">
              <VStack alignItems="flex-start" spacing={0}>
                <Text fontSize="xl" color="gray.900" fontWeight="bold">
                  {title}
                </Text>
                <Box w="50px" h="5px" bgColor="primary.500"></Box>
              </VStack>
              <Badge color="gray.50" bgColor="primary.500" p={2}>
                {price?.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </Badge>
            </Flex>

            <Text fontSize="sm" color="gray.800">
              {description}
            </Text>

            <Flex w="100%" justifyContent="flex-end">
              <Button
                label={
                  hasProduct ? 'Remover do carrinho' : 'Adicionar ao carrinho'
                }
                backgroundColor="primary.500"
                color="gray.50"
                _hover={{
                  backgroundColor: 'primary.600'
                }}
                leftIcon={
                  hasProduct ? (
                    <MdRemoveShoppingCart color="white" size={14} />
                  ) : (
                    <MdShoppingCart color="white" size={14} />
                  )
                }
                size="sm"
                borderRadius="sm"
                onClick={
                  hasProduct
                    ? () => handleRemoveProductFromCart(id)
                    : () => handleAddProductToCart(id)
                }
                isLoading={loading}
              />
            </Flex>
          </VStack>
        </Flex>
      </Flex>
    </>
  )
}
