import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LocalStorage, { LocalStorageKey } from '~/utilities/local-storage/localStorage'

const PublicRoute: React.FC = () => {
  const accessToken = LocalStorage.get(LocalStorageKey.ACCESS_TOKEN)

  return accessToken ? <Navigate to='/' /> : <Outlet />
}

export default PublicRoute
