/* eslint-disable camelcase */

export type ProductForm = {
  id: string
  title: string
  price: number
  description: string
  images: string[]
  category: any
  operationSystem: string
}

export type ProductKeys = keyof ProductForm
