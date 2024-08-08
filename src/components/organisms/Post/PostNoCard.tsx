import React, { useState } from 'react'
import { IPost } from '~/types/post'
import { useTranslation } from 'react-i18next'
import { useColorScheme } from '@mui/material'
import TimeComparison from '~/const/dateFormat'
import { toast } from 'react-toastify'
import { AppDispatch, RootState } from '~/app/appHooks'
import { useDispatch, useSelector } from 'react-redux'
import { likePost, unLikePost } from '~/apis/post/postThunk'
import CarouselImage from '~/components/atoms/Carousel/CarouselImage'

interface IProps {
  post: IPost
}

const PostNoCard: React.FC<IProps> = ({ post }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { mode } = useColorScheme()

  return (
    <div className={`h-auto w-full rounded-xl ${mode === 'light' ? 'bg-white' : 'bg-black-300'} `}>
      <div className='flex items-center space-x-2 p-2.5 px-4 rounded-lg'>
        <div className='h-11 w-12'>
          <img src={post.imageUrl} className='h-full w-full rounded-full' alt='dp' />
        </div>
        <div className='flex flex-grow flex-col'>
          <p className='text-lg font-semibold text-black'>{post.fullName}</p>
          <span className='text-xs font-thin text-gray-400'>
            <TimeComparison t={t} time={post.createdAt} />
          </span>
        </div>
      </div>
      {post.content ? (
        <div className='mb-1'>
          <p className='max-h-10 truncate px-3 text-md'>{post.content}</p>
        </div>
      ) : null}
      {post.imageUrls
        ? post.imageUrls.map((image) => (
            <div className='h-76 max-h-100 w-full' key={image}>
              <img src={image} alt='postImage' className='max-h-100 w-full object-cover rounded-xl' />
            </div>
          ))
        : null}
      {/* {post.imageUrls && <CarouselImage images={post.imageUrls} />} */}
    </div>
  )
}

export default PostNoCard
