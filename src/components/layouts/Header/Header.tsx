import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import routesName from '~/routes/enum.routes'
import { HomeIcon } from '~/components/atoms/Icons/HomeIcon'
import { WatchIcon } from '~/components/atoms/Icons/WatchIcon'
import { GroupIcon } from '~/components/atoms/Icons/GroupIcon'
import { BellIcon } from '~/components/atoms/Icons/BellIcon'
import Button from '~/components/atoms/Button'
import { useTranslation } from 'react-i18next'
import { useColorScheme } from '@mui/material/styles'
import MaterialUISwitch from '~/components/atoms/SwitchDarkMode/SwitchDarkMode'
import { AppDispatch, RootState } from '~/app/appHooks'
import { useDispatch, useSelector } from 'react-redux'
import { changeLanguage } from 'i18next'
import DrawerLanguage from '~/components/atoms/Drawer/DrawerLanguage'
import SearchUser from '~/components/organisms/Search/SearchUser'
import Notification from '~/components/organisms/Notification/GetNoti'
import { Badge } from '@mui/material'
import { deleteMessageNoti } from '~/slices/noti/notiSlice'
import GetModalProfile from '~/components/organisms/Sidebar/Home/ProfileModal'
import { fetchEventNoti } from '~/apis/noti/notiThunk'

const MENU_ITEMS = [
  { name: 'Home', path: routesName.HOME, icon: HomeIcon },
  { name: 'Watch', path: routesName.WATCH, icon: WatchIcon },
  { name: 'GROUP', path: routesName.GROUP, icon: GroupIcon }
]

const languages = [
  { text: 'Vietnamese', onClick: () => changeLanguage('vi') },
  { text: 'English', onClick: () => changeLanguage('en') }
]

const Header: React.FC = () => {
  const { pathname } = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const { mode, setMode } = useColorScheme()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const data = useSelector((state: RootState) => state.user.user)
  const noti = useSelector((state: RootState) => state.noti.notiEvent)
  const [isOpenNotification, setIsOpenNotification] = useState(false)
  const [isOpenProfile, setIsOpenProfile] = useState(false)

  const toggleProfile = () => {
    setIsOpenProfile(!isOpenProfile)
  }

  const closeProfileModal = () => {
    setIsOpenProfile(false)
  }
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const toggleMode = () => {
    if (mode === 'dark') {
      setMode('light')
    } else {
      setMode('dark')
    }
  }

  useEffect(() => {
    const fetchNoti = async () => {
      try {
        await dispatch(fetchEventNoti())
      } catch (error) {
        console.error('Error fetching notifications:', error)
      } finally {
        timeoutRef.current = setTimeout(fetchNoti, 1000)
      }
    }

    fetchNoti()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [dispatch])

  const handleDeleteEvent = () => {
    dispatch(deleteMessageNoti())
  }
  return (
    <header
      className={`fixed z-10 flex h-[75px] w-full px-2 gap-2 mx-auto items-center justify-between ${mode === 'light' ? 'bg-white' : 'bg-black-300'} shadow-md`}
    >
      <div className='col-span-2 flex items-center'>
        <div className='ml-2 flex gap-2 items-center'>
          <div className=''>
            <Link to='/'>
              <img src='/img/fb-icon.png' className='h-[50px] w-[50px] rounded-full' alt='dp' />
            </Link>
          </div>
          <SearchUser />
        </div>
      </div>
      <nav className='hidden lg:gap-10  md:flex '>
        {MENU_ITEMS.map((item, index) => (
          <div key={index}>
            <Link
              className={clsx('leading-14 relative block text-lg font-medium text-neutral-200 hover:text-primary', {
                "!font-bold !text-primary after:mx-auto after:block  after:h-2 after:w-full after:rounded-full after:bg-primary after:content-[''] ":
                  `/${pathname.split('/')[1]}` === item.path
              })}
              to={item.path}
            >
              <div
                className={`flex h-16 w-24 cursor-pointer items-center justify-center rounded-lg ${mode === 'light' ? 'hover:bg-gray-100' : ' hover:bg-neutral-600'}`}
              >
                <div className='relative flex h-auto w-14 items-center justify-center'>
                  {item.icon && <item.icon />}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </nav>

      <div className='col-span-2 flex items-center justify-end'>
        <div className='flex h-10 w-auto items-center gap-2'>
          <DrawerLanguage menuItems={languages} />

          <MaterialUISwitch
            onClick={toggleMode}
            sx={{ my: 0 }}
            size='medium'
            checked={mode === 'light' ? true : false}
          />

          {/* <Link to='/message'>
            <Badge badgeContent={noti?.messageCount} color='primary'>
              <Button
                className={`rounded-full w-12  ${mode === 'light' ? 'bg-gray-200' : 'bg-neutral-500'} border-none`}
                onClick={() => handleDeleteEvent()}
              >
                <MessageIcon />
              </Button>
            </Badge>
          </Link> */}
          <Badge badgeContent={noti?.informCount} color='primary'>
            <Button
              className={`rounded-full w-12 ${mode === 'light' ? 'bg-gray-200 hover:bg-gray-100' : 'bg-neutral-500 hover:bg-neutral-600'} border-none`}
              onClick={() => setIsOpenNotification(!isOpenNotification)}
            >
              <BellIcon />
            </Button>
          </Badge>

          <Notification isOpen={isOpenNotification} onClose={() => setIsOpenNotification(false)} />

          <Button className='rounded-full h-12 w-12' onClick={toggleProfile}>
            <img src={data?.imageUrl} className='h-12 w-12 rounded-full' alt='avatar' />
          </Button>
          <GetModalProfile isOpen={isOpenProfile} onClose={closeProfileModal} />
        </div>
      </div>
    </header>
  )
}

export default Header
