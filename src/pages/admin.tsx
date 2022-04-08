import { useToast } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { AdminTemplate } from '../templates/AdminTemplate'

const Admin: NextPage = () => {
  const { token } = useAuth()
  const { push } = useRouter()
  const toast = useToast()

  useEffect(() => {
    if (!token) {
      push('/')
    }
  }, [push, toast, token])

  return (
    <>
      <AdminTemplate />
    </>
  )
}

export default Admin
