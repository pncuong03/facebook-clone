import { useColorScheme } from '@mui/material'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchListFriend } from '~/apis/friend/friendThunk'
import { AppDispatch, RootState } from '~/app/appHooks'
import Button from '~/components/atoms/Button'
import { Elipsis } from '~/components/atoms/Icons/Elipsis'
import { SearchIcon } from '~/components/atoms/Icons/SearchIcon'

const Contacts = () => {
  const { mode } = useColorScheme()
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const friends = useSelector((state: RootState) => state.friend.listFriend)
  useEffect(() => {
    dispatch(fetchListFriend())
  }, [])
  return (
    <div
      className={`p-4 h-full flex flex-col gap-2 rounded-lg shadow-md ${mode === 'light' ? 'bg-white' : 'bg-black-300'}`}
    >
      <div className='flex items-center justify-between'>
        <p className='font-semibold text-lg '>{t('home.contact')}</p>

        <div className='flex items-center space-x-3S'>
          {/* <Button className='rounded-full'>
            <SearchIcon />
          </Button> */}
          <Button className='rounded-full'>
            <Elipsis />
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        {friends?.map((friend) => (
          <Link
            to={`/${friend.id}`}
            key={friend.id}
            className={` mb-2 flex gap-3 h-12 cursor-pointer items-center space-x-2 rounded-md p-2   ${mode === 'light' ? 'hover:bg-gray-200' : 'hover:bg-neutral-800'}`}
          >
            <img className='h-12 w-12 rounded-full' src={friend.imageUrl} alt='user' />
            <p className='text-lg font-medium '>{friend.fullName}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Contacts
