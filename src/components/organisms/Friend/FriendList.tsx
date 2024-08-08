import React, { useEffect } from 'react'
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ISearchUser } from '~/types/user'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/app/appHooks'
import { fetchListFriend } from '~/apis/friend/friendThunk'
import FriendCard from '~/components/organisms/Friend/FriendCard'
import { useTranslation } from 'react-i18next'

const FriendList = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const dispatch = useDispatch<AppDispatch>()

  const listFriend = useSelector((state: RootState) => state.friend.listFriend)

  useEffect(() => {
    dispatch(fetchListFriend())
  }, [])

  return (
    <div className='h-full w-full pt-64 md:pt-16 md:pl-[420px]'>
      <p className='font-semibold text-2xl py-3'>{t('home.allfriend')}</p>

      <div className='grid md:grid-cols-4 grid-cols-2 md:gap-16 gap-2 '>
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
