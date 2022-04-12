/* eslint-disable camelcase */
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

export type ResponseImage = {
  data: ImageType
  success: boolean
  status: number
}

export type UploadedImage = {
  image: ImageType
  isLoading: boolean
}
