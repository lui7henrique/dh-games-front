import { useMemo } from 'react'
import {
  Box,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'

import { Limiter } from '../../components/Limiter'
import { Participant } from '../../components/Participant'

export const AboutUsTemplate = () => {
  const participants = useMemo(
    () => [
      {
        name: 'Luiz Henrique',
        description:
          'Desenvolvedor front-end (ReactJS, NextJS, TypeScript & GraphQL )',
        image: '/luizhenrique.jpeg',
        github: 'https://github.com/lui7henrique',
        linkedin: 'https://www.linkedin.com/in/luiz-henrique7/',
        twitter: 'https://twitter.com/lui7henrique',
        instagram: 'https://www.instagram.com/lui7henrique/'
      },
      {
        name: 'Guilherme Chehade',
        description:
          'Desenvolvedor Full-Stack | JavaScript | React.js | Node.js',
        image: '/chehade.jpeg',
        github: 'https://github.com/guiChehade',
        linkedin: 'https://www.linkedin.com/in/guilherme-chehade-a18644a3/'
      },
      {
        name: 'Mario Braga',
        description:
          'Aspirante a Desenvolvedor Full-Stack | JavaScript | React.js | Java | Spring Boot',
        image: '/mariobraga.jpg',
        github: 'https://github.com/mariomarthins',
        linkedin: 'https://www.linkedin.com/in/mario-martins-8842b41b1/',
        twitter: 'https://twitter.com/bragammartins',
        instagram: 'https://www.instagram.com/mariobragamartins/'
      },
      {
        name: 'Luiz Henrique',
        description: 'Desenvolvedor front-end (ReactJS, NextJS & TypeScript)',
        image: '/luizhenrique.jpeg',
        github: 'https://github.com/lui7henrique',
        linkedin: 'https://www.linkedin.com/in/luiz-henrique7/',
        twitter: 'https://twitter.com/lui7henrique',
        instagram: 'https://www.instagram.com/lui7henrique/'
      },
      {
        name: 'Luiz Henrique',
        description: 'Desenvolvedor front-end (ReactJS, NextJS & TypeScript)',
        image: '/luizhenrique.jpeg',
        github: 'https://github.com/lui7henrique',
        linkedin: 'https://www.linkedin.com/in/luiz-henrique7/',
        twitter: 'https://twitter.com/lui7henrique',
        instagram: 'https://www.instagram.com/lui7henrique/'
      },
      {
        name: 'Luiz Henrique',
        description: 'Desenvolvedor front-end (ReactJS, NextJS & TypeScript)',
        image: '/luizhenrique.jpeg',
        github: 'https://github.com/lui7henrique',
        linkedin: 'https://www.linkedin.com/in/luiz-henrique7/',
        twitter: 'https://twitter.com/lui7henrique',
        instagram: 'https://www.instagram.com/lui7henrique/'
      },
      {
        name: 'Luiz Henrique',
        description: 'Desenvolvedor front-end (ReactJS, NextJS & TypeScript)',
        image: '/luizhenrique.jpeg',
        github: 'https://github.com/lui7henrique',
        linkedin: 'https://www.linkedin.com/in/luiz-henrique7/',
        twitter: 'https://twitter.com/lui7henrique',
        instagram: 'https://www.instagram.com/lui7henrique/'
      }
    ],
    []
  )

  return (
    <Limiter minH="calc(100vh - 6rem)">
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        minH="calc(100vh - 6rem)"
        alignItems="flex-start"
        justifyContent="center"
        spacing={8}
        py={8}
      >
        <VStack position="sticky" alignItems="flex-start" top={8}>
          <Heading>Feito para gamers, por gamers.</Heading>
          <Text>
            Uma empresa{' '}
            <Text as="span" textDecoration="line-through">
              (fictícia)
            </Text>{' '}
            que busca oferecer a melhor experiência de compra para os jogadores.
          </Text>
        </VStack>

        <VStack w="100%" alignItems="flex-start">
          <HStack mb={4}>
            <Box h="32px" w="8px" bgColor="primary.500" />
            <Heading fontSize={{ base: 20, lg: 24 }}>Integrantes</Heading>
          </HStack>

          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              xl: 'repeat(3, 1fr)'
            }}
            w="100%"
            gap={8}
          >
            {participants.map((participant) => (
              <Participant key={JSON.stringify(participant)} {...participant} />
            ))}
          </Grid>
        </VStack>
      </Stack>
    </Limiter>
  )
}
