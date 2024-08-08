import { useColorScheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '~/app/appHooks'
import { GroupIcon } from '~/components/atoms/Icons/GroupIcon'
import { UsersIcon } from '~/components/atoms/Icons/UsersIcon'
import routesName from '~/routes/enum.routes'

const FriendSidebar = () => {
  const { t } = useTranslation()
  const { mode } = useColorScheme()

  const MENU_ITEMS = [
    { name: 'Friends', path: routesName.FRIENDREQUEST, icon: UsersIcon, title: t('home.request') },
    { name: 'Groups', path: routesName.FRIENDLIST, icon: GroupIcon, title: t('home.allfriend') }
  ]

  return (
    <div
      className={`fixed z-0 w-full md:w-[24rem] h-60 md:h-screen shadow-md pl-6 pt-14 ${mode === 'light' ? 'bg-white' : 'bg-black-300'}`}
    >
      <div className='font-semibold text-2xl pb-4'>{t('home.friend')}</div>
      {MENU_ITEMS.map((item, index) => (
        <div
          key={index}
          className={`${mode === 'light' ? 'hover:bg-gray-200' : 'hover:bg-neutral-800'} -ml-2 rounded-lg`}
        >
          <Link to={item.path}>
            <div className='flex gap-3 h-14 w-full cursor-pointer items-center rounded-lg '>
              <div className='relative flex h-auto w-14 items-center justify-center'>{item.icon && <item.icon />}</div>
              <div className='font-medium text-xl'>{item.title}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default FriendSidebar
