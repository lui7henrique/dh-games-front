// Vendors
import Link from 'next/link'

// Components
import {
  AspectRatio,
  Box,
  chakra,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Text,
  VStack
} from '@chakra-ui/react'
import Image from 'next/image'
import { useCallback } from 'react'
import { IconType } from 'react-icons'

import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

// Types
type ParticipantProps = {
  name: string
  description: string
  image: string
  github: string
  linkedin: string
  twitter?: string
  instagram?: string
}

/*
|-----------------------------------------------------------------------------
| Component
|-----------------------------------------------------------------------------
|
|
*/
const ChakraNextImage = chakra(Image)

type IconLinkProps = {
  icon: IconType
  href: string
}

export const Participant = (props: ParticipantProps) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const { image, name, description, github, linkedin, twitter, instagram } =
    props

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
  const IconLink = useCallback((props: IconLinkProps) => {
    const { icon: Icon, href } = props

    return (
      <AspectRatio ratio={1}>
        <Flex
          w="100%"
          alignItems="center"
          justifyContent="center"
          bgColor="primary.500"
          as="a"
          target="blank"
          href={href ?? href}
          transition="all 0.2s"
          borderRadius="sm"
          _hover={{
            bgColor: 'primary.600'
          }}
        >
          <Icon size={16} color="white" />
        </Flex>
      </AspectRatio>
    )
  }, [])

  /*
  |-----------------------------------------------------------------------------
  | Effects
  |-----------------------------------------------------------------------------
  |
  |
  */

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
    <Flex
      direction="column"
      w="100%"
      h="100%"
      justifyContent="space-between"
      bgColor="gray.800"
      transition="all 0.2s"
      _hover={{
        bgColor: '#1f1f1f'
      }}
    >
      <Box>
        <AspectRatio ratio={1 / 1} w="100%">
          <Box w="100%">
            <Skeleton
              w="100%"
              h="100%"
              startColor="gray.800"
              endColor="gray.900"
              fadeDuration={0.6}
            />
            <ChakraNextImage
              src={image}
              layout="fill"
              objectFit="cover"
              borderTopRadius="sm"
              alt={name}
            />
          </Box>
        </AspectRatio>

        <VStack
          align="flex-start"
          w="100%"
          spacing={2}
          p={4}
          borderBottomRadius="sm"
        >
          <Heading as="h3" fontSize="lg">
            {name}
          </Heading>
          <Text fontSize="sm">{description}</Text>
        </VStack>
      </Box>

      <Grid templateColumns="repeat(6, 1fr)" w="100%" gap={2} p={4}>
        {github && <IconLink icon={FaGithub} href={github} />}
        {linkedin && <IconLink icon={FaLinkedin} href={linkedin} />}
        {twitter && <IconLink icon={FaTwitter} href={twitter} />}
        {instagram && <IconLink icon={FaInstagram} href={instagram} />}
      </Grid>
    </Flex>
  )
}
