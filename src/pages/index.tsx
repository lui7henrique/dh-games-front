import React from 'react'
import type { NextPage } from 'next'

import { Heading } from '@chakra-ui/react'
import { GameCard } from '../components/GameCard'

const Home: NextPage = () => {
  return (
    <>
      <Heading textColor="purple.700">dh-games</Heading>
      <GameCard
        game={{
          title: 'The Witcher 3: Wild Hunt',
          thumbnail: 'https://picsum.photos/1920/1080',
          price: 59.99,
          producer: 'CD Projekt RED',
        }}
      />
    </>
  )
}

export default Home
