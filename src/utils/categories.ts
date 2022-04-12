export const categories = [
  {
    label: 'Plataforma',
    value: 'platform'
  },
  {
    label: 'Horror',
    value: 'horror'
  },
  {
    label: 'Mundo aberto',
    value: 'openWorld'
  },
  {
    label: 'Aventura',
    value: 'adventure'
  },
  {
    label: 'Ação',
    value: 'action'
  },
  {
    label: 'RPG',
    value: 'rpg'
  },
  {
    label: 'Luta',
    value: 'fight'
  },
  {
    label: 'Corrida',
    value: 'racing'
  },
  {
    label: 'Esporte',
    value: 'sports'
  },
  {
    label: 'Simulação',
    value: 'simulation'
  },
  {
    label: 'Estratégia',
    value: 'strategy'
  },
  {
    label: 'MMO',
    value: 'mmo'
  },
  {
    label: 'FPS',
    value: 'fps'
  },
  {
    label: 'Tabuleiro',
    value: 'board'
  },
  {
    label: 'MOBA',
    value: 'moba'
  }
]

export const getCategoryByValue = (value: string) => {
  return categories.find((category) => category.value === value)
}
