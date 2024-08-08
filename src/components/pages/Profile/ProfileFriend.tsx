import React, { useEffect, useState } from 'react'
import EditBackground from '../../organisms/Profile/Header/EditBackground'
import Intro from '../../organisms/Profile/Footer/Intro'
import Album from '../../organisms/Profile/Footer/Album'
import FriendProfile from '~/components/organisms/Profile/Footer/Friend'
import { useColorScheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/app/appHooks'
import { fetchPostFriend } from '~/apis/post/postThunk'
import ShareCard from '~/components/organisms/Post/ShareCard'
import { useParams } from 'react-router-dom'
import { fetchInfoFriend } from '~/apis/friend/friendThunk'
import Info from '~/components/organisms/Profile/Header/Info'

const ProfileFriend: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { mode } = useColorScheme()
  const { id } = useParams<{ id: string }>()
  const posts = useSelector((state: RootState) => state.post.postOfFriend)
  const userInfo = useSelector((state: RootState) => state.friend.friendInfo)
  const listFriend = useSelector((state: RootState) => state.friend.listFriend)

  useEffect(() => {
    if (id) {
      dispatch(fetchPostFriend(id))
    }
  }, [])

  useEffect(() => {
    if (id) {
      dispatch(fetchInfoFriend(id))
    }
  }, [dispatch])

  return (
    <div>
      <div className={`h-auto w-full shadow ${mode === 'light' ? 'bg-white' : 'bg-neutral-800'}`}>
        <div className={`mx-auto h-full max-w-6xl rounded-md ${mode === 'light' ? 'bg-white' : 'bg-neutral-800'}`}>
          <EditBackground data={userInfo} />
          <Info data={userInfo} dataFriend={listFriend} />
        </div>
      </div>

      <div className='mx-auto w-full lg:grid grid-cols-3 gap-4 h-full mt-6 px-3 md:px-6 lg:px-14 2xl:px-96'>
        <div className='grid gap-4 mb-4 col-span-1 h-fit'>
          <Intro data={userInfo} />
          <Album />
          <FriendProfile data={listFriend} />
        </div>
        <div className='grid gap-2 col-span-2 '>
          <ShareCard post={posts} />
        </div>
      </div>
    </div>
  )
}

export default ProfileFriend
