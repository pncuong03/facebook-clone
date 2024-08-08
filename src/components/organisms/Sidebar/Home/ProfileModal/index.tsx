import React, { useEffect, useRef } from 'react'
import { useColorScheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/app/appHooks'
import { logOut } from '~/slices/auth/authSlice'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { UsersIcon } from '~/components/atoms/Icons/UsersIcon'
import { GroupIcon } from '~/components/atoms/Icons/GroupIcon'
import { GamingIcon } from '~/components/atoms/Icons/GamingIcon'
import { LogoutIcon } from '~/components/atoms/Icons/LogoutIcon'
import routesName from '~/routes/enum.routes'

interface ModalProfileProps {
  isOpen: boolean
  onClose: () => void
}

const GetModalProfile: React.FC<ModalProfileProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { mode } = useColorScheme()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const data = useSelector((state: RootState) => state.user.user)
  const modalRef = useRef<HTMLDivElement | null>(null)

  const MENU_ITEMS = [
    { name: 'Friends', path: routesName.FRIEND, icon: UsersIcon, title: t('home.friend') },
    { name: 'Groups', path: routesName.GROUP, icon: GroupIcon, title: t('home.group') },
    { name: 'Gaming', path: routesName.GAMING, icon: GamingIcon, title: t('home.gaming') }
  ]

  const handleLogout = () => {
    dispatch(logOut())
    toast.success(t('home.logout'))
    navigate('/login')
    onClose()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  return (
    <div>
      {isOpen && (
        <div
          ref={modalRef}
          className={`absolute top-6 right-4 mt-11 md:w-72 max-h-[600px] ${mode === 'light' ? 'bg-white' : 'bg-black-700 border-black-700'} shadow-lg border rounded-xl overflow-y-auto`}
        >
          <Link to='/profile'>
            <div
              className={`h-16 flex items-center space-x-4 px-2.5 rounded-lg ${mode === 'light' ? 'hover:bg-gray-200 ' : 'hover:bg-neutral-600'}`}
              onClick={onClose}
            >
              <div className='h-14 w-14'>
                <img src={data?.imageUrl} className='h-full w-full rounded-full' alt='dp' />
              </div>
              <div className='flex'>
                <p className='text-lg font-semibold'>{data?.fullName}</p>
              </div>
            </div>
          </Link>
          {MENU_ITEMS.map((item, index) => (
            <div
              key={index}
              className={`${mode === 'light' ? 'hover:bg-gray-200' : 'hover:bg-neutral-600'} rounded-lg`}
              onClick={onClose}
            >
              <Link to={item.path}>
                <div className='flex gap-4 h-16 w-full cursor-pointer items-center rounded-lg'>
                  <div className='relative flex h-auto w-14 items-center justify-center'>
                    {item.icon && <item.icon width={30} />}
                  </div>
                  <div className='font-semibold text-lg'>{item.title}</div>
                </div>
              </Link>
            </div>
          ))}

          <div
            className={`flex gap-4 h-16 w-full cursor-pointer items-center rounded-lg ${mode === 'light' ? 'hover:bg-gray-200' : 'hover:bg-neutral-600'}`}
            onClick={handleLogout}
          >
            <div className='relative flex h-auto w-14 items-center justify-center'>
              <LogoutIcon />
            </div>
            <div className='font-semibold text-lg'>{t('home.logouts')}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GetModalProfile
