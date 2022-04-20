export const categoriesLabel = [
  { id: 5, name: 'simulation', label: 'Simulação' },
  { id: 6, name: 'rpg', label: 'RPG' },
  { id: 8, name: 'platform', label: 'Plataforma' },
  { id: 9, name: 'horror', label: 'Terror' },
  { id: 10, name: 'openWorld', label: 'Mundo Aberto' },
  { id: 11, name: 'adventure', label: 'Aventura' },
  { id: 12, name: 'action', label: 'Ação' },
  { id: 13, name: 'fight', label: 'Luta' },
  { id: 14, name: 'racing', label: 'Corrida' },
  { id: 15, name: 'sports', label: 'Esportes' },
  { id: 16, name: 'strategy', label: 'Estratégia' },
  { id: 18, name: 'mmo', label: 'MMO' },
  { id: 19, name: 'fps', label: 'FPS' },
  { id: 20, name: 'board', label: 'Tabuleiro' },
  { id: 21, name: 'moba', label: 'MOBA' }
]

export const getCategoryLabelByName = (name: string) => {
  const category = categoriesLabel.find((category) => category.name === name)

  return category?.label ?? 'Desconhecido'
}
