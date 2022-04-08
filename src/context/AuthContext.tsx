import { useToast } from '@chakra-ui/react'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { sleep } from '../utils/sleep'

import { v4 } from 'uuid'
import { useRouter } from 'next/router'

type Token = string | undefined

type AuthContextType = {
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  token: Token
}

export const AuthContext = createContext({} as AuthContextType)

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const toast = useToast()
  const { push } = useRouter()

  const key = '@dh-games-auth:token'
  const [token, setToken] = useState<Token>()

  const login = async (email: string, password: string) => {
    if (
      email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      await sleep(1200)

      toast({
        title: 'Login realizado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true
      })

      const token = v4()

      localStorage.setItem(key, token)
      setToken(token)

      return true
    } else {
      toast({
        title: 'Login inválido!',
        description: 'Verifique seus dados e tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })

      return false
    }
  }

  const logout = () => {
    localStorage.removeItem(key)
    setToken(undefined)

    push('/')
  }

  useEffect(() => {
    const token = localStorage.getItem(key)

    if (token) {
      setToken(token)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ login, logout, token }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const value = useContext(AuthContext)

  return value
}
