import React from 'react'
import type { NextPage } from 'next'

import { GameCard } from '../components/GameCard'
import { Header } from '../components/Header'

const Home: NextPage = () => {
  return (
    <>
      <Header />
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
