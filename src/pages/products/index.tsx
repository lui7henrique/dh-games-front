import { Grid } from '@chakra-ui/react'
import type { GetStaticProps, NextPage } from 'next'
import { GameCard } from '../../components/GameCard'
import { Limiter } from '../../components/Limiter'
import { api } from '../../services/api'
import { Game } from '../../types/game'

type ProductsProps = {
  games: Game[]
}

const Products = (props: ProductsProps) => {
  const { games } = props

  console.log(games)

  return (
    <>
      <Limiter>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          }}
          gap="1.5rem"
        >
          {games.map((game, index) => {
            return <GameCard game={game} key={index} />
          })}
        </Grid>
      </Limiter>
    </>
  )
}

export default Products

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await api.get<Game[]>('/products')

  return {
    props: {
      games: data
    } // will be passed to the page component as props
  }
}
