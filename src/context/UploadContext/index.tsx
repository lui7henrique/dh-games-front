import { toast, useToast } from '@chakra-ui/react'
import {
  ChangeEvent,
  createContext,
  Dispatch,
  DragEvent,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState
} from 'react'
import { imgbb } from '../../services/imgbb'
import { ImageType, ResponseImage } from './types'

type UploadContextType = {
  uploadedImage: ImageType
  setUploadedImage: Dispatch<SetStateAction<ImageType>>
  isLoading: boolean
  handleUploadImage: (image: File) => Promise<void>
  handleUploadFileByInput: (e: ChangeEvent<HTMLInputElement>) => void
  onDragOver: (e: DragEvent<HTMLDivElement>) => void
  onDrop: (e: DragEvent<HTMLDivElement>) => void
}

export const UploadContext = createContext({} as UploadContextType)

type UploadContextProviderProps = {
  children: ReactNode
}

export const UploadContextProvider = (props: UploadContextProviderProps) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */

  /*
  |-----------------------------------------------------------------------------
  | States
  |-----------------------------------------------------------------------------
  |
  |
  */
  const [uploadedImage, setUploadedImage] = useState<ImageType>({} as ImageType)
  const [isLoading, setIsLoading] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const toast = useToast()

  /*
  |-----------------------------------------------------------------------------
  | Functions
  |-----------------------------------------------------------------------------
  |
  |
  */
  const handleUploadImage = useCallback(async (image: File) => {
    setIsLoading(true)

    const formData = new FormData()
    formData.append('image', image)

    try {
      const { data } = await imgbb.post<ResponseImage>('/upload', formData)

      const imageResponse = data.data

      setUploadedImage(imageResponse)

      toast({
        title: 'Imagem enviada com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    } catch (err: unknown) {
      toast({
        title: 'Não foi possível enviar a imagem',
        description: 'Tente novamente mais tarde',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleUploadFileByInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = [...e.target.files!]
      const image = files[0]

      handleUploadImage(image)
    },
    [handleUploadImage]
  )

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()

    setIsDragOver(true)
  }, [])

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.stopPropagation()
      e.preventDefault()

      const files = [...e.dataTransfer.files]
      const image = files[0]

      handleUploadImage(image)
    },
    [handleUploadImage]
  )

  /*
  |-----------------------------------------------------------------------------
  | Effects
  |-----------------------------------------------------------------------------
  |
  |
  */

  return (
    <UploadContext.Provider
      value={{
        uploadedImage,
        setUploadedImage,
        isLoading,
        handleUploadImage,
        handleUploadFileByInput,
        onDragOver,
        onDrop
      }}
    >
      {props.children}
    </UploadContext.Provider>
  )
}

export const useUpload = () => {
  const value = useContext(UploadContext)

  return value
}
