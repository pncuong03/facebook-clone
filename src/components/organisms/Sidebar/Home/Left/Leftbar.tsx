import { useColorScheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '~/app/appHooks'
import { GamingIcon } from '~/components/atoms/Icons/GamingIcon'
import { GroupIcon } from '~/components/atoms/Icons/GroupIcon'
import { UsersIcon } from '~/components/atoms/Icons/UsersIcon'
import routesName from '~/routes/enum.routes'

const Leftbar = () => {
  const { t } = useTranslation()
  const { mode } = useColorScheme()
  const data = useSelector((state: RootState) => state.user.user)

  const MENU_ITEMS = [
    { name: 'Friends', path: routesName.FRIEND, icon: UsersIcon, title: t('home.friend') },
    { name: 'Groups', path: routesName.GROUP, icon: GroupIcon, title: t('home.group') },
    { name: 'Gmaing', path: routesName.GAMING, icon: GamingIcon, title: t('home.gaming') }
  ]

  const GROUP_ITEMS = [
    {
      name: 'Việc làm IT & IT jobs',
      imageUrl: 'https://picsum.photos/100?random=1',
      title: 'Việc làm IT & IT job part/full  time'
    },
    {
      name: 'IT jobs part/fulltime PM/Dev/Tester/Devops',
      imageUrl: 'https://picsum.photos/100?random=2',
      title: 'IT jobs part/fulltime PM/Dev/Tester/Devops'
    },
    { name: 'FC MUSVN', imageUrl: 'https://picsum.photos/100?random=3', title: 'FC MUSVN' },
    { name: 'Chợ Gia Lộc', imageUrl: 'https://picsum.photos/100?random=4', title: 'Chợ Gia Lộc' },
    { name: 'Thethao247.vn', imageUrl: 'https://picsum.photos/100?random=5', title: 'Thethao247.vn' },
    { name: 'TTTN D20 - Thầy Đức', imageUrl: 'https://picsum.photos/100?random=6', title: 'TTTN D20 -  Thầy Đức' }
  ]

  return (
    <div className={`grid gap-4 space-x-2  ${mode === 'light' ? 'bg-white' : 'bg-black-300'}`}>
      <Link to='/profile'>
        <div
          className={`h-16 flex items-center space-x-4 px-2.5 rounded-lg ${mode === 'light' ? 'hover:bg-gray-200' : 'hover:bg-neutral-600'}`}
        >
          <div className='h-14 w-14'>
            <img src={data?.imageUrl} className='h-full w-full rounded-full' alt='dp' />
          </div>
          <div className='flex'>
            <p className='text-lg font-semibold '>{data?.fullName}</p>
          </div>
        </div>
      </Link>
      {MENU_ITEMS.map((item, index) => (
        <div key={index} className={`${mode === 'light' ? 'hover:bg-gray-200' : 'hover:bg-neutral-600'} rounded-lg`}>
          <Link to={item.path}>
            <div className='flex gap-4 h-16 w-full cursor-pointer items-center rounded-lg '>
              <div className='relative flex h-auto w-14 items-center justify-center'>{item.icon && <item.icon />}</div>
              <div className='font-semibold text-lg'>{item.title}</div>
            </div>
          </Link>
        </div>
      ))}

      <div className={`mt-auto border-t-[1px] ${mode === 'light' ? 'border-gray-300 ' : 'border-gray-600'}`}>
        <div className='text-lg font-semibold mb-2 mt-3'>{t('home.yourshortcut')}</div>
        {GROUP_ITEMS.map((item, index) => (
          <Link key={index} to='/group'>
            <div
              className={`flex items-center gap-4 h-16 w-full cursor-pointer rounded-lg p-2 ${mode === 'light' ? 'hover:bg-gray-200' : 'hover:bg-neutral-600'}`}
            >
              <div className='h-13 w-16'>
                <img src={item.imageUrl} className='h-full w-full rounded-lg' alt={`group-${index}`} />
              </div>
              <div className='font-medium text-lg w-full break-words'>{item.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Leftbar
