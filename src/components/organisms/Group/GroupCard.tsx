import React from 'react'
import { useColorScheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Button from '~/components/atoms/Button'
import { LikeIcon } from '~/components/atoms/Icons/LikeIcon'
import { CommentIcon } from '~/components/atoms/Icons/CommentIcon'
import { ShareIcon } from '~/components/atoms/Icons/ShareIcon'
import TimeComparison from '~/const/dateFormat'
import { Elipsis } from '~/components/atoms/Icons/Elipsis'

type IGroup = {
  data: any
}

const GroupCard: React.FC<IGroup> = ({ data }) => {
  const { mode } = useColorScheme()
  const { t } = useTranslation()
  // const dispatch = useDispatch<AppDispatch>()

  return (
    <div className='flex flex-col gap-3 '>
      <p className='font-semibold text-2xl mb-3'>{t('home.activity')}</p>
      <div className='p-2 rounded-lg'>
        {data.map((post: any) => (
          <div
            key={post.id}
            className={`rounded-lg ${mode === 'light' ? 'bg-white' : 'bg-black-300'} border-b border-gray-300 mb-3`}
          >
            <div className='flex items-center space-x-2 p-4'>
              <div className='h-14 w-14'>
                <img src={post.imageUrl} className='h-full w-full rounded-full' alt='user' />
              </div>
              <div className='flex flex-grow flex-col'>
                <p className='text-xl font-semibold text-black'>{post.fullName}</p>
                <span className='text-sm text-gray-400'>
                  <TimeComparison t={t} time={post.createdAt} />
                </span>
              </div>
              <div>
                <Elipsis />
              </div>
            </div>
            <div className=''>
              <p className='p-4 text-lg font-normal'>{post.content}</p>
              {post.imageUrls && (
                <div className='h-full'>
                  <img src={post.imageUrls} className='w-full object-cover rounded-xl' alt='post-image' />
                </div>
              )}
            </div>
            <div className='flex space-x-3 text-sm font-semibold p-3'>
              <Button className='rounded-md'>
                <LikeIcon />
                {t('home.like')}
              </Button>
              <Button className='rounded-md'>
                <CommentIcon />
                {t('home.comment')}
              </Button>
              <Button className='rounded-md'>
                <ShareIcon />
                {t('home.share')}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GroupCard
