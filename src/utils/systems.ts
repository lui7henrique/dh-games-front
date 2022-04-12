export const systems = [
  {
    value: 'PC',
    label: 'PC'
  },
  {
    value: 'console',
    label: 'Console'
  },
  {
    value: 'mobile',
    label: 'Mobile'
  }
]

export const getSystemByValue = (value: string) => {
  return systems.find((system) => system.value === value)
}
