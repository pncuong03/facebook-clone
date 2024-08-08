import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '~/components/atoms/Button'
import EditProfileModal from './EditProfileModal'
import { IUser } from '~/types/user'
import { CameraIcon } from '~/components/atoms/Icons/CameraIcon'
import { useDispatch } from 'react-redux'
import { editAvatar } from '~/apis/user/userThunk'
import { AppDispatch } from '~/app/appHooks'
import { IFriend } from '~/types/friend'
import { useNavigate } from 'react-router-dom'
import { light } from '@mui/material/styles/createPalette'
import { useColorScheme } from '@mui/material'

interface IntroProps {
  data: IUser
  dataFriend: IFriend[] | null
}
const Info: React.FC<IntroProps> = ({ data, dataFriend }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { mode } = useColorScheme()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenUnFriend, setIsOpenUnFriend] = useState(false)
  const handleUnfriend = () => {
    setIsOpenUnFriend(true)
  }
  const handleNavigate = () => {
    navigate('/friend/list')
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      await dispatch(editAvatar(formData))
    }
  }

  const handleAvatar = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className='flex flex-col lg:flex-row items-center lg:justify-between pb-5 '>
      <div className='relative flex flex-col lg:flex-row lg:gap-4 items-center mx-auto lg:mx-8'>
        <div className='z-0 -mt-20 lg:-mt-8 h-[12rem] w-[12rem] relative'>
          <img className='h-full w-full rounded-full border-4 border-primary' src={data?.imageUrl} alt='dp' />
          <Button
            className='absolute bottom-2 right-1 p-1 bg-gray-200 rounded-full cursor-pointer'
            onClick={handleAvatar}
          >
            <CameraIcon />
          </Button>
        </div>
        <div className='flex flex-col items-center lg:items-start'>
          <p className='text-[2rem] font-bold '>{data?.fullName}</p>
          <button className='cursor-pointer text-sm font-semibold text-gray-400 ' onClick={handleNavigate}>
            {dataFriend?.length} {t('home.friend')}
          </button>
        </div>
      </div>
      {data?.state ? (
        <div className='p-3 md:mx-auto lg:mx-6'>
          <Button className='w-full rounded-md px-3 font-semibold bg-neutral-400  ' onClick={handleUnfriend}>
            <p className='text-lg'>{t('home.friend')}</p>
          </Button>
        </div>
      ) : (
        <div className='p-3 md:mx-auto lg:mx-6'>
          <Button
            className={`w-full rounded-md px-3 font-semibold ${mode === 'light' ? 'bg-neutral-400 ' : 'bg-neutral-700'}`}
            onClick={() => setIsOpen(true)}
          >
            <p className='text-lg'>{t('home.editprofile')}</p>
          </Button>
        </div>
      )}
      <input type='file' accept='image/*' ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

      <EditProfileModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </div>
  )
}

export default Info
