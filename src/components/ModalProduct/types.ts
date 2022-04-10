/* eslint-disable camelcase */

export type ProductForm = {
  id: string
  title: string
  price: number
  description: string
  images: string[]
  category: string
  operationSystem: string
}

export type ProductKeys = keyof ProductForm

export type ResponseImage = {
  data: ImageType
  success: boolean
  status: number
}

export type ImageType = {
  id: string
  title: string
  url_viewer: string
  url: string
  display_url: string
  size: number
  time: string
  expiration: string
  is_360: string
  image: {
    filename: string
    name: string
    mime: string
    extension: string
    url: string
  }
  thumb: {
    filename: string
    name: string
    mime: string
    extension: string
    url: string
  }
  medium: {
    filename: string
    name: string
    mime: string
    extension: string
    url: string
  }
  delete_url: string
}
