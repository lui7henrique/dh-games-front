import type { GetStaticProps, NextPage } from 'next'
import { GamesSlider } from '../components/GamesSlider'
import { api } from '../services/api'
import { Game } from '../types/game'
// import { useSeed } from '../hooks/useSeed'

type HomeProps = {
  games: Game[]
} & NextPage

const Home = (props: HomeProps) => {
  const { games } = props
  // const { handleCreateGames } = useSeed()
  // handleCreateGames(10)
  return (
    <>
      <GamesSlider games={games} />
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await api.get<Game>('/products')

  return {
    props: {
      games: data
    } // will be passed to the page component as props
  }
}
