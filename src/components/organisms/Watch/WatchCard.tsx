import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/app/appHooks'
import { useColorScheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Button from '~/components/atoms/Button'
import { LikeIcon } from '~/components/atoms/Icons/LikeIcon'
import { CommentIcon } from '~/components/atoms/Icons/CommentIcon'
import { ShareIcon } from '~/components/atoms/Icons/ShareIcon'

const videoData = [
  {
    id: 1,
    user: 'Cường',
    time: 'Khoang 2 gio truoc',
    description: 'Trận chung kết của thế kỷ',
    videoUrl: 'https://www.youtube.com/embed/tpPmn2ZuOV8'
  },
  {
    id: 2,
    user: 'Hà anh',
    time: 'Khoang 3 gio truoc',
    description: 'Tài năng của siêu sao',
    videoUrl: 'https://www.youtube.com/embed/786rNxVoQtU'
  },
  {
    id: 3,
    user: 'Tuyết',
    time: 'Khoang 2 gio truoc',
    description: 'Khoảnh khắc của siêu sao thế kỷ',
    videoUrl: 'https://www.youtube.com/embed/ZmKy_fnRM_E'
  },
  {
    id: 4,
    user: 'Hải',
    time: 'Khoang 3 gio truoc',
    description: 'Nhũng vũ công Samba',
    videoUrl: 'https://www.youtube.com/embed/_TleFMmKbco'
  }
  // Add more video data here
]

const WatchCard = () => {
  const { mode } = useColorScheme()
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className='flex flex-col gap-3 pt-3'>
      <div className={`p-4 rounded-lg ${mode === 'light' ? 'bg-white' : 'bg-black-300'}`}>
        <p className='font-semibold text-2xl mb-3'>Video mới dành cho bạn</p>
        <div className='flex'>
          {videoData.slice(0, 2).map((video) => (
            <div key={video.id} className='flex gap-3'>
              <img className='h-14 w-14 rounded-full' src='https://random.imagecdn.app/600/200' />
              <div className='w-96'>
                <p className='text-xl font-normal'>{video.description}</p>
                <p className='text-sm font-semibold text-blue-600'>{video.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {videoData.map((video) => (
        <div key={video.id} className={`rounded-lg ${mode === 'light' ? 'bg-white' : 'bg-black-300'}`}>
          <div className='flex items-center space-x-2 p-4'>
            <div className='h-14 w-14'>
              <img src='https://random.imagecdn.app/600/200' className='h-full w-full rounded-full' alt='dp' />
            </div>
            <div className='flex flex-grow flex-col'>
              <p className='text-xl font-semibold text-black'>{video.user}</p>
              <span className='text-sm text-gray-400'>{video.time}</span>
            </div>
          </div>
          <div className='mb-1 pl-2'>
            <p className='max-h-10 truncate px-3 text-lg font-normal'>{video.description}</p>
          </div>
          <div className='relative'>
            <iframe
              width='100%'
              height='460'
              src={video.videoUrl}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              title='YouTube video player'
            ></iframe>
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
  )
}

export default WatchCard
