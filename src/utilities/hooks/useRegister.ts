import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userRegister } from '~/apis/auth/authThunk'
import { AppDispatch } from '~/app/appHooks'

export const useRegister = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onRegister = useCallback(
    async (fullName: any, username: any, password: string) => {
      await dispatch(userRegister({ fullName, username, password }))
      navigate('/')
    },
    [dispatch]
  )

  return { onRegister }
}
