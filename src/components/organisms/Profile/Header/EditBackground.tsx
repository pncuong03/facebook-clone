import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { editBackground, editUser } from '~/apis/user/userThunk'
import { AppDispatch } from '~/app/appHooks'
import Button from '~/components/atoms/Button'
import { CameraIcon } from '~/components/atoms/Icons/CameraIcon'
import { IUser } from '~/types/user'

interface IntroProps {
  data: IUser
}

const EditBackground: React.FC<IntroProps> = ({ data }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image_background', file)
      await dispatch(editBackground(formData))
    }
  }

  const handleBackgroud = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div
      className='relative h-[15rem] xl:h-[30rem] max-h-[28.75rem] w-full rounded-lg bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: data?.backgroundUrl
          ? `url(${data?.backgroundUrl})`
          : 'linear-gradient(to right, #e5e5e5, #f9f9f9)'
      }}
    >
      {data?.state ? null : (
        <div className='absolute flex w-full items-center justify-center -bottom-4'>
          <div className='absolute bottom-[30px] right-[30px]'>
            <Button className='bg-neutral-400 rounded-md px-1 text-neutral-100' onClick={handleBackgroud}>
              <CameraIcon />
              <p className='hidden lg:flex pr-1'>{t('home.editphoto')}</p>
            </Button>
          </div>
        </div>
      )}
      <input type='file' accept='image/*' ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
    </div>
  )
}

export default EditBackground
