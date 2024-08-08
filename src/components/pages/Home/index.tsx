import React, { useEffect } from 'react'
import LeftSidebar from '~/components/organisms/Sidebar/Home/Left'
import RightSidebar from '~/components/organisms/Sidebar/Home/Right'
import CreatePostBox from '~/components/organisms/Post/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/app/appHooks'
import { fetchPostPublicOfFriend } from '~/apis/post/postThunk'
import { fetchInfoUser } from '~/apis/user/userThunk'
import ShareCard from '~/components/organisms/Post/ShareCard'

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const postPublic = useSelector((state: RootState) => state.post.postPublic)

  useEffect(() => {
    dispatch(fetchPostPublicOfFriend())
  }, [])

  useEffect(() => {
    dispatch(fetchInfoUser())
  }, [dispatch])

  useEffect(() => {})

  return (
    <div className='flex justify-between fixed top-0 bottom-0 left-0 right-0 pt-12'>
      <LeftSidebar />

      <div
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        className='overflow-y-auto flex mx-auto lg:mx-6 p-2 flex-col gap-2 w-[45rem] mt-10 md:mt-16'
      >
        <CreatePostBox bgColor='' isOpen={true} closeModal={() => {}} />
        <ShareCard post={postPublic} />
      </div>
      <RightSidebar />
    </div>
  )
}

export default HomePage
