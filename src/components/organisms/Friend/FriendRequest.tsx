import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/app/appHooks'
import { fetchListRequest } from '~/apis/friend/friendThunk'
import FriendRequestCard from '~/components/organisms/Friend/FriendRequestCard'

const FriendRequest = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: RootState) => state.friend.listRequest)

  useEffect(() => {
    dispatch(fetchListRequest())
  }, [])
  return (
    <div className='h-full w-full pt-60 lg:pt-16 lg:pl-[420px] px-4'>
      <p className='font-semibold text-2xl py-2'>{t('home.request')}</p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5  lg:gap-10 gap-2 '>
        {data.length > 0 ? (
          data.map((friend: any) => <FriendRequestCard key={friend.id} data={friend} />)
        ) : (
          <Typography variant='inherit' color='textSecondary'>
            {t('home.nofriendrequest')}
          </Typography>
        )}
      </div>
    </div>
  )
}

export default FriendRequest
