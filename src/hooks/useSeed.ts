import faker from '@faker-js/faker'
import { api } from '../services/api'
import { Game } from '../types/game'

export const useSeed = () => {
  const handleCreateGames = (n: number) => {
    Array.from({ length: n }).forEach((_, index) => {
      const fixedIndex = String(index).padStart(2, '0')

      const newGame = {
        titulo: faker.lorem.words(3),
        descricao: faker.lorem.words(10),
        imagem: [
          `https://picsum.photos/19${fixedIndex}/10${fixedIndex}?random`
        ],
        preco: +faker.commerce.price(20, 500),
        categoria: faker.commerce.department(),
        sistema: faker.lorem.words(1)
      }

      api.post('/products', {
        ...newGame
      })
    })
  }

  const handleDeleteGames = async () => {
    const { data } = await api.get<Game[]>('/products')

    data.forEach(async (game) => {
      await api.delete(`/products/${game.id}`)
    })
  }

  return {
    handleCreateGames,
    handleDeleteGames
  }
}
