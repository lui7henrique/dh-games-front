import React from 'react'
import { AspectRatio, Badge, Flex, Heading, Image } from '@chakra-ui/react'

type GameCardProps = {
  game: {
    title: string
    thumbnail: string
    price: number
    producer: string
  }
}

export const GameCard = (props: GameCardProps) => {
  const { game } = props

  return (
    <Flex direction="column" w="72" bgColor="gray.800">
      <AspectRatio ratio={16 / 9} w="full">
        <Image src={game.thumbnail} alt={game.title} />
      </AspectRatio>
      <Heading fontSize="1rem">{game.title}</Heading>
      <Heading fontSize="0.6rem">{game.producer}</Heading>
      <Badge
        colorScheme="green"
        w="16"
        px="13px"
        d="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
      >
        R${game.price}
      </Badge>
    </Flex>
  )
}
