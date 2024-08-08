import React, { useEffect, useState } from 'react'
import Album from '../../organisms/Profile/Footer/Album'
import FriendProfile from '~/components/organisms/Profile/Footer/Friend'
import { useColorScheme } from '@mui/material'
import CreatePostBox from '~/components/organisms/Post/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/app/appHooks'
import { fetchInfoUser } from '~/apis/user/userThunk'
import { fetchPostOfMe } from '~/apis/post/postThunk'
import ShareCard from '~/components/organisms/Post/ShareCard'
import Info from '~/components/organisms/Profile/Header/Info'
import EditBackground from '~/components/organisms/Profile/Header/EditBackground'
import Intro from '~/components/organisms/Profile/Footer/Intro'
import { fetchListFriend } from '~/apis/friend/friendThunk'

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { mode } = useColorScheme()
  const data = useSelector((state: RootState) => state.post.postOfMe)
  const userInfo = useSelector((state: RootState) => state.user.user)
  const listFriend = useSelector((state: RootState) => state.friend.listFriend)

  useEffect(() => {
    dispatch(fetchPostOfMe())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchInfoUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchListFriend())
  }, [dispatch])

  return (
    <div className=''>
      <div className={`h-auto w-full shadow ${mode === 'light' ? 'bg-white' : 'bg-neutral-800'}`}>
        <div className={`mx-auto h-full max-w-6xl rounded-md ${mode === 'light' ? 'bg-white ' : 'bg-neutral-800'}`}>
          <EditBackground data={userInfo} />
          <Info data={userInfo} dataFriend={listFriend} />
        </div>
      </div>

      <div className='mx-auto w-full lg:grid grid-cols-3 gap-4 h-full mt-6 px-2 md:px-6 2xl:px-96'>
        <div className='grid gap-4 mb-4 col-span-1 h-fit '>
          <Intro data={userInfo} />
          <Album />
          <FriendProfile data={listFriend} />
        </div>
        <div className='grid gap-2 col-span-2 w-[45rem]'>
          <CreatePostBox bgColor='' isOpen={true} closeModal={() => {}} />
          <ShareCard post={data} />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
