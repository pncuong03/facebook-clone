import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '~/components/atoms/Button'
import { ImageIcon } from '~/components/atoms/Icons/ImageIcon'
import { SmileIcon } from '~/components/atoms/Icons/SmileIcon'
import { YouTubeIcon } from '~/components/atoms/Icons/YoutubeIcon'
import CreatePostModal from './CreatePostModal'
import { useColorScheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '~/app/appHooks'

type Props = {
  isOpen: boolean
  closeModal: () => void
  bgColor: string
}
const CreatePostBox: React.FC<Props> = () => {
  const { t } = useTranslation()
  const { mode } = useColorScheme()
  const [isOpen, setIsOpen] = useState(false)
  const data = useSelector((state: RootState) => state.user.user)

  return (
    <div
      className={`flex flex-col rounded-lg h-max p-4 shadow-md max-w-[370px] md:max-w-[720px]  ${mode === 'light' ? 'bg-white' : 'bg-black-300'} `}
    >
      <div
        className={`mb-2 flex items-center space-x-2 border-b pb-3 ${mode === 'light' ? 'border-gray-200' : 'border-gray-600'}`}
      >
        <div className='h-12 w-12'>
          <img src={data?.imageUrl} className='h-full w-full rounded-full' alt='dp' />
        </div>
        <button
          className={`h-12 flex-grow rounded-full font-normal ${mode === 'light' ? 'bg-gray-100' : 'bg-neutral-700'} pl-5 text-left text-gray-400 `}
          onClick={() => setIsOpen(true)}
        >
          {data?.fullName}, {t('home.whatmind')} ?
        </button>
      </div>
      <div className='-mb-1 flex space-x-3 text-sm'>
        <Button className='gap-2 rounded-md' onClick={() => setIsOpen(true)}>
          <YouTubeIcon />
          <p className='font-semibold'>{t('home.create')}</p>
        </Button>
        <Button className='gap-2 rounded-md' onClick={() => setIsOpen(true)}>
          <ImageIcon />
          <p className='font-semibold'>{t('home.photo')}</p>
        </Button>
        <Button className='md:flex hidden gap-2 rounded-md' onClick={() => setIsOpen(true)}>
          <SmileIcon />
          <p className='font-semibold'>{t('home.feeling')}</p>
        </Button>
      </div>

      <CreatePostModal bgColor='bg-neutral-400' isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </div>
  )
}

export default CreatePostBox
