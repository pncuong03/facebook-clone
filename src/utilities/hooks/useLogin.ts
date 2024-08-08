import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '~/apis/auth/authThunk'
import { AppDispatch, RootState } from '~/app/appHooks'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, FacebookAuthProvider } from 'firebase/auth'
import { auth } from '~/apis/firebase'
import { register } from 'module'
import { useRegister } from './useRegister'

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { onRegister } = useRegister()

  const onLogin = useCallback(
    async (username: any, password: string) => {
      await dispatch(userLogin({ username, password }))
      navigate('/')
    },
    [dispatch]
  )

  const onLoginGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, new GoogleAuthProvider())
      const displayName = res.user.displayName
      const email = res.user.email
      await onRegister(displayName, email, '1234')
    } catch (error) {}
  }

  return { onLogin, onLoginGoogle }
}
