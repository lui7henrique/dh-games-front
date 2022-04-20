import {
  Box,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import { useMemo } from 'react'
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
        description: 'Desenvolvedor Front-End(Typescript, Next.js, React.js)',
        image: '/mariobraga.jpg',
        github: 'https://github.com/mariomarthins',
        linkedin: 'https://www.linkedin.com/in/mario-martins-8842b41b1/',
        twitter: 'https://twitter.com/bragammartins',
        instagram: 'https://www.instagram.com/mariobragamartins/'
      },
      {
        name: 'Thiago Maurat',
        description: 'Desenvolvedor front-end (ReactJS, NextJS & TypeScript)',
        image: '/ThiagoMaurat.jpg',
        github: 'https://github.com/ThiagoMaurat',
        linkedin: 'https://www.linkedin.com/in/thiago-maurat-477a041b9/',
        twitter: 'https://twitter.com/Thiago_Maurat',
        instagram: 'https://www.instagram.com/thiago_mmd/'
      },
      {
        name: 'Wirley Almeida',
        description: 'Desenvolvedor Full-Stack | React + Spring',
        image: '/wirleyalmeida.jpg',
        github: 'https://github.com/WirleySAlmeida',
        linkedin: 'https://www.linkedin.com/in/wirley-almeida-91343154/',
        twitter: '',
        instagram: ''
      },
      {
        name: 'João Rocha',
        description: 'Desenvolvedor Front End (JavaScript, ReactJs)',
        image: '/joaorocha.jpeg',
        github: 'https://github.com/joaolrocha',
        linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-rocha-2aaa99225/',
        twitter: '',
        instagram: 'https://www.instagram.com/joaolrocha/'
      },
      {
        name: 'Gustavo Souza',
        description: 'Desenvolvedor Front End (JavaScript, ReactJs)',
        image: '/gustavosouza.jpg',
        github: 'https://github.com/gustavomes',
        linkedin: 'https://www.linkedin.com/in/gustavo-medeiros-385931213',
        twitter: 'https://twitter.com/gustavomes',
        instagram: 'https://www.instagram.com/gustavomedeirosfoto/'
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
        <VStack
          position={{ base: 'initial', lg: 'sticky' }}
          alignItems="flex-start"
          top={{ base: 0, lg: 8 }}
        >
          <Heading mb={4} data-aos="fade-right" data-aos-delay={100}>
            Feito para gamers, por gamers.
          </Heading>
          <Text data-aos="fade-right" data-aos-delay={200}>
            Uma empresa{' '}
            <Text as="span" textDecoration="line-through">
              (fictícia)
            </Text>{' '}
            que busca oferecer a melhor experiência de compra para os jogadores.
          </Text>
        </VStack>

        <VStack w="100%" alignItems="flex-start">
          <HStack mb={4} data-aos="fade-right" data-aos-delay={300}>
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
            {participants.map((participant, index) => (
              <Participant
                index={index}
                key={JSON.stringify(participant)}
                {...participant}
              />
            ))}
          </Grid>
        </VStack>
      </Stack>
    </Limiter>
  )
}
