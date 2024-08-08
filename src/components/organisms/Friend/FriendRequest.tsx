import React, { useEffect } from 'react'
import FriendCard from './FriendCard'
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
    <div className='h-full p-4 w-full pt-64 md:pt-16 md:pl-[420px]'>
      <p className='font-semibold text-2xl py-3'>{t('home.request')}</p>

      <div className='grid md:grid-cols-4 grid-cols-2 md:gap-16 gap-2 '>
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
