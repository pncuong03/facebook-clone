import React, { useState } from 'react'
import { IPost } from '~/types/post'
import { HeartIcon } from '../../atoms/Icons/HeartIcon'
import { LikeIcon } from '../../atoms/Icons/LikeIcon'
import { CommentIcon } from '../../atoms/Icons/CommentIcon'
import Button from '~/components/atoms/Button'
import { useTranslation } from 'react-i18next'
import { ShareIcon } from '~/components/atoms/Icons/ShareIcon'
import { useColorScheme } from '@mui/material'
import GetLikeModal from './GetLikeModal'
import TimeComparison from '~/const/dateFormat'
import { toast } from 'react-toastify'
import { AppDispatch, RootState } from '~/app/appHooks'
import { useDispatch, useSelector } from 'react-redux'
import { likePost, unLikePost } from '~/apis/post/postThunk'
import { access } from 'fs/promises'
import clsx from 'clsx'
import GetShareModal from './GetShareModal'
import GetDetailModal from './GetDetailModal'

interface IProps {
  post: IPost
}

const PostCardComment: React.FC<IProps> = ({ post }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { mode } = useColorScheme()
  const [isOpenLiked, setIsOpenLiked] = useState(false)
  const [isOpenShared, setIsOpenShared] = useState(false)
  const [isOpenCommented, setIsOpenCommented] = useState(false)

  const likeHandler = () => {
    if (post.hasLike === true) {
      dispatch(unLikePost(post?.id))
      toast.success(t('home.unlikepost'))
    } else {
      dispatch(likePost(post?.id))
      toast.success(t('home.likepost'))
    }
  }

  return (
    <div className='h-auto w-full rounded-md'>
      <div className='flex items-center space-x-2 p-2.5 px-4'>
        <div className='h-11 w-12'>
          <img src={post?.imageUrl} className='h-full w-full rounded-full' alt='dp' />
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
          <p className='max-h-24 overflow-hidden text-ellipsis px-3 text-md font-normal break-words'>{post.content}</p>
        </div>
      ) : null}

      {post.imageUrls?.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {post.imageUrls.map((url, index) => (
            <div key={index} className='h-76 max-h-96 w-full'>
              <img src={url} alt={`postImage-${index}`} className='max-h-96 w-full object-cover' />
            </div>
          ))}
        </div>
      )}

      <div className='flex w-full mt-4 flex-col space-y-2 p-2 px-4'>
        <div className={`flex items-center justify-between  text-sm`}>
          <div className='flex items-center'>
            <div className='flex items-center'>
              <span className='flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 '>
                <HeartIcon />
              </span>

              <button className='ml-1' onClick={() => setIsOpenLiked(true)}>
                <p className='text-gray-400 font-inherit'>
                  {post.likeCount} {t('home.like')}
                </p>
              </button>
            </div>
          </div>
          <div className='flex items-center space-x-2 text-sm'>
            <button className='text-gray-400 font-inherit'>
              {post.commentCount} {t('home.comment')}
            </button>
            <button className='text-gray-400 font-inherit'>
              {post.shareCount} {t('home.share')}
            </button>
          </div>
        </div>
        <div className={`flex space-x-3 text-sm font-semibold border-y-2 py-1`}>
          <Button
            className={clsx('rounded-md', {
              'text-primary': post.hasLike
            })}
            onClick={likeHandler}
          >
            <LikeIcon liked={post.hasLike} />
            {t('home.like')}
          </Button>
          <Button className='rounded-md' onClick={() => setIsOpenCommented(true)}>
            <CommentIcon />
            {t('home.comment')}
          </Button>

          <Button className='rounded-md' onClick={() => setIsOpenShared(true)}>
            <ShareIcon />
            {t('home.share')}
          </Button>
        </div>
      </div>

      <GetLikeModal
        bgColor='bg-neutral-400'
        isOpen={isOpenLiked}
        closeModal={() => setIsOpenLiked(false)}
        postId={post.id}
      />
      <GetShareModal isOpen={isOpenShared} closeModal={() => setIsOpenShared(false)} shareId={post.id} />
      {/* <GetDetailModal
        bgColor=''
        isOpen={isOpenCommented}
        closeModal={() => setIsOpenCommented(false)}
        postId={post.id}
      /> */}
    </div>
  )
}

export default PostCardComment
