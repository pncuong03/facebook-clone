import { useEffect } from 'react'
import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/app/appHooks'
import { fetchListFriend } from '~/apis/friend/friendThunk'
import FriendCard from '~/components/organisms/Friend/FriendCard'
import { useTranslation } from 'react-i18next'

const FriendList = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const listFriend = useSelector((state: RootState) => state.friend.listFriend)

  useEffect(() => {
    dispatch(fetchListFriend())
  }, [])

  return (
    <div className='h-full w-full pt-60 lg:pt-16 lg:pl-[420px] px-4'>
      <p className='font-semibold text-2xl py-2'>{t('home.allfriend')}</p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5  lg:gap-10 gap-2 '>
        {listFriend.length > 0 ? (
          listFriend.map((friend: any) => <FriendCard key={friend.id} data={friend} />)
        ) : (
          <Typography variant='inherit' color='textSecondary' className='text-lg'>
            {t('home.nofriend')}
          </Typography>
        )}
      </div>
    </div>
  )
}

export default FriendList
