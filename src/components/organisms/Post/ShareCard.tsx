import TimeComparison from '~/const/dateFormat'
import PostCard from './PostCard'
import { IPost } from '~/types/post'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/app/appHooks'
import { Collapse, useColorScheme } from '@mui/material'
import PostNoCard from './PostNoCard'
import Button from '~/components/atoms/Button'
import clsx from 'clsx'
import { LikeIcon } from '~/components/atoms/Icons/LikeIcon'
import { CommentIcon } from '~/components/atoms/Icons/CommentIcon'
import { ShareIcon } from '~/components/atoms/Icons/ShareIcon'
import { useTranslation } from 'react-i18next'
import { HeartIcon } from '~/components/atoms/Icons/HeartIcon'
import { useState } from 'react'
import { deletePost, likePost, unLikePost } from '~/apis/post/postThunk'
import { toast } from 'react-toastify'
import GetLikeModal from './GetLikeModal'
import GetShareModal from './GetShareModal'
import GetComment from './CommentModal'
import { Elipsis } from '~/components/atoms/Icons/Elipsis'
import { DeleteIcon } from '~/components/atoms/Icons/DeleteIcon'

interface IProps {
  post: IPost[]
}

const ShareCard: React.FC<IProps> = ({ post }) => {
  const { mode } = useColorScheme()
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()

  const [isOpenLiked, setIsOpenLiked] = useState(false)
  const [isOpenShared, setIsOpenShared] = useState(false)
  const [isOpenComment, setIsOpenComment] = useState(false)

  const likeHandler = (hasLike: boolean, id: string) => {
    if (hasLike === true) {
      dispatch(unLikePost(id))
      toast.success(t('home.unlikepost'))
    } else {
      dispatch(likePost(id))
      toast.success(t('home.likepost'))
    }
  }

  const handleDelete = (postId: string) => {
    dispatch(deletePost(postId))
    toast.success(t('home.deletepost'))
  }

  return (
    <div className='flex flex-col gap-3 pt-3 max-w-[370px] md:max-w-[720px]'>
      {[...post]?.reverse().map((item) => (
        <div key={item.id}>
          {item.sharePost ? (
            <div
              className={`h-auto w-full flex flex-col rounded-lg shadow-md ${mode === 'light' ? 'bg-white' : 'bg-black-300'} `}
            >
              <div className='flex items-center space-x-2 p-2.5 px-4'>
                <div className='h-12 w-12'>
                  <img src={item.imageUrl} className='h-full w-full rounded-full' alt='dp' />
                </div>
                <div className='flex flex-grow flex-col'>
                  <p className='text-lg font-semibold text-black'>{item.fullName}</p>
                  <span className='text-xs font-thin text-gray-400'>
                    <TimeComparison t={t} time={item.createdAt} />
                  </span>
                </div>

                <div onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </div>
              </div>
              {item.content ? (
                <div className='mb-1'>
                  <p className='max-h-10 truncate px-4 text-md break-words'>{item.content}</p>
                </div>
              ) : null}

              <div className='m-4 rounded-xl border-[1px] border-gray-400'>
                <PostNoCard post={item.sharePost} />
              </div>
              <div className='flex w-full flex-col space-y-2 p-2 px-4'>
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
                          {item.likeCount} {t('home.like')}
                        </p>
                      </button>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2 text-sm'>
                    <button className='text-gray-400 font-inherit'>
                      {item.commentCount} {t('home.comment')}
                    </button>
                    <button className='text-gray-400 font-inherit'>
                      {item.shareCount} {t('home.share')}
                    </button>
                  </div>
                </div>
                <div className='flex space-x-3 text-sm font-semibold  '>
                  <Button
                    className={clsx('rounded-md', {
                      'text-primary': item.hasLike
                    })}
                    onClick={() => likeHandler(item.hasLike, item.id)}
                  >
                    <LikeIcon liked={item.hasLike} />
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
                {/* <Collapse in={isOpenComment}>
                  <GetComment postId={item?.id} />
                </Collapse> */}
              </div>
            </div>
          ) : (
            <PostCard post={item} />
          )}
          <GetLikeModal
            bgColor='bg-neutral-400'
            isOpen={isOpenLiked}
            closeModal={() => setIsOpenLiked(false)}
            postId={item.id}
          />
          <GetShareModal isOpen={isOpenShared} closeModal={() => setIsOpenShared(false)} shareId={item.id} />
        </div>
      ))}
    </div>
  )
}

export default ShareCard
