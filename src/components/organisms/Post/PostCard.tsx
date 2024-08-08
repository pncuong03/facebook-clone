import React, { useEffect, useState } from 'react'
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
import { AppDispatch } from '~/app/appHooks'
import { useDispatch } from 'react-redux'
import { deletePost, fetchDetailPost, likePost, unLikePost } from '~/apis/post/postThunk'
import clsx from 'clsx'
import GetShareModal from './GetShareModal'
import { Link } from 'react-router-dom'
import Collapse from '@mui/material/Collapse'
import GetComment from './CommentModal'
import { DeleteIcon } from '~/components/atoms/Icons/DeleteIcon'
import CarouselImage from '~/components/atoms/Carousel/CarouselImage'

interface IProps {
  post: IPost
}

const PostCard: React.FC<IProps> = ({ post }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()

  const { mode } = useColorScheme()
  const [isOpenLiked, setIsOpenLiked] = useState(false)
  const [isOpenShared, setIsOpenShared] = useState(false)
  const [isOpenComment, setIsOpenComment] = useState(false)

  const likeHandler = () => {
    if (post.hasLike === true) {
      dispatch(unLikePost(post?.id))
    } else {
      dispatch(likePost(post?.id))
    }
  }

  useEffect(() => {
    if (isOpenComment) {
      dispatch(fetchDetailPost(post?.id))
    }
  }, [post?.id, isOpenComment, dispatch])

  const handleDelete = (postId: string) => {
    dispatch(deletePost(postId))
  }

  return (
    <div className={`h-auto rounded-md shadow-md  ${mode === 'light' ? 'bg-white' : 'bg-black-300'} `}>
      <div className='flex justify-between'>
        <Link to={`${post.userId}`} className='flex items-center space-x-2 p-4'>
          <div className='h-11 w-12'>
            <img src={post?.imageUrl} className='h-full w-full rounded-full' alt='dp' />
          </div>
          <div className='flex flex-grow flex-col'>
            <p className='text-lg font-semibold text-black'>{post.fullName}</p>
            <span className='text-xs text-gray-400'>
              <TimeComparison t={t} time={post.createdAt} />
            </span>
          </div>
        </Link>
        <button className='p-4' onClick={() => handleDelete(post?.id)}>
          <DeleteIcon />
        </button>
      </div>
      {post.content ? (
        <div className='mb-1 pl-2'>
          <p className='max-h-24 overflow-hidden text-ellipsis px-3 text-md font-normal break-words'>{post.content}</p>
        </div>
      ) : null}

      {/* {post.imageUrls && <CarouselImage images={post.imageUrls} />} */}
      {post.imageUrls
        ? post.imageUrls.map((image) => (
            <div className=' max-h-100 w-full' key={image}>
              <img src={image} alt='postImage' className='max-h-100 w-full object-cover rounded-xl' />
            </div>
          ))
        : null}
      <div className='flex w-full flex-col space-y-2 p-3'>
        <div
          className={`flex items-center justify-between ${mode === 'light' ? 'border-gray-200' : 'border-gray-600'} border-b-[1px] pb-2 text-sm`}
        >
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
            <button className='text-gray-400 font-inherit' onClick={() => setIsOpenShared(true)}>
              {post.shareCount} {t('home.share')}
            </button>
          </div>
        </div>
        <div className='flex space-x-3 text-sm font-semibold  '>
          <Button
            className={clsx('rounded-md', {
              'text-primary': post.hasLike
            })}
            onClick={likeHandler}
          >
            <LikeIcon liked={post.hasLike} />
            {t('home.like')}
          </Button>
          <Button className='rounded-md' onClick={() => setIsOpenComment((prev) => !prev)}>
            <CommentIcon />
            {t('home.comment')}
          </Button>
          <Button className='rounded-md' onClick={() => setIsOpenShared(true)}>
            <ShareIcon />
            {t('home.share')}
          </Button>
        </div>
      </div>

      <Collapse in={isOpenComment}>
        <GetComment postId={post?.id} />
      </Collapse>

      <GetLikeModal
        bgColor='bg-neutral-400'
        isOpen={isOpenLiked}
        closeModal={() => setIsOpenLiked(false)}
        postId={post.id}
      />
      <GetShareModal isOpen={isOpenShared} closeModal={() => setIsOpenShared(false)} shareId={post.id} />
    </div>
  )
}

export default PostCard
