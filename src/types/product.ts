export type Product = {
  id: string
  title: string
  price: number
  description: string
  images: string[]
  category: {
    id: number
    name: string
  }
  operatingSystem: string
}
