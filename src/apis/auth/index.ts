import LocalStorage, { LocalStorageKey } from '~/utilities/local-storage/localStorage'
import httpRequest from '~/utilities/services/httpRequest'

export function authLogin(params: { username: string; password: string }) {
  return httpRequest.post('/user/log-in', params).then((data: any) => {
    localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, data.data.accessToken)

    return data
  })
}

export function authRegister(params: { fullName: string; username: string; password: string }) {
  return httpRequest.post('/user/sign-up', params).then((data: any) => {
    localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, data.data.accessToken)

    return data
  })
}

export const logout = () => {
  LocalStorage.remove(LocalStorageKey.ACCESS_TOKEN)
}
