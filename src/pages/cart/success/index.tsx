import {
  Box,
  Flex,
  Heading,
  Popover,
  Text,
  Tooltip,
  VStack
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FiCheck } from 'react-icons/fi'
import { Button } from '../../../components/Button'
import { Limiter } from '../../../components/Limiter'
import { useCart } from '../../../context/CartContext'

const Success: NextPage = () => {
  const { push } = useRouter()
  const { handleClearCart } = useCart()

  useEffect(() => {
    handleClearCart()
  }, [])

  return (
    <>
      <Limiter h="calc(100vh - 5rem)">
        <VStack
          h="100%"
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            p={4}
            backgroundColor="primary.500"
            borderRadius="5px"
          >
            <FiCheck size={80} color="white" />
          </Flex>

          <VStack spacing={2}>
            <Heading textAlign="center">Pedido realizado com sucesso!</Heading>
            <Text textAlign="center">
              Seu pedido foi realizado com sucesso, e em breve chegará no seu
              e-mail.
            </Text>

            <Tooltip label="Clique aqui para ser redirecionado para a página inicial!">
              <Box>
                <Button label="Ok" onClick={() => push('/')}></Button>
              </Box>
            </Tooltip>
          </VStack>
        </VStack>
      </Limiter>
    </>
  )
}

export default Success
