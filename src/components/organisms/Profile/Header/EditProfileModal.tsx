import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '~/components/atoms/Modal'
import Button from '~/components/atoms/Button'
import { AppDispatch, RootState } from '~/app/appHooks'
import { useDispatch, useSelector } from 'react-redux'
import { editUser, fetchInfoUser } from '~/apis/user/userThunk'
import Input from '~/components/atoms/Input'
import { toast } from 'react-toastify'
import { IUser } from '~/types/user'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const EditProfileModal: React.FC<Props> = ({ isOpen, closeModal }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: RootState) => state.user.user)

  const [info, setInfo] = useState({
    fullName: '',
    gender: '',
    description: ''
  })

  useEffect(() => {
    if (data) {
      setInfo({
        fullName: data.fullName || '',
        gender: data.gender || '',
        description: data.description || ''
      })
    }
  }, [data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setInfo({
      ...info,
      [name]: value
    })
  }

  const handleUpdate = async () => {
    const formData = new FormData()
    formData.append('new_user_info', JSON.stringify(info))

    await dispatch(editUser(formData))
    toast.success(t('home.updateprofile'))

    closeModal()
  }

  return (
    <Modal
      title={t('home.editprofile')}
      closeModal={closeModal}
      bgColor='bg-white'
      isOpen={isOpen}
      className='!top-1/2 !left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 lg:ml-14'
    >
      <div className='p-6 space-y-3 max-h-96 xl:max-h-[710px] overflow-y-auto'>
        <Input
          name='fullName'
          label={t('home.fullname')}
          className='w-full p-3 outline-none bor border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400'
          value={info.fullName}
          onChange={handleChange}
        />

        <div className='font-semibold text-lg'>{t('home.gender')}</div>
        <select
          name='gender'
          className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
          value={info.gender}
          onChange={handleChange}
        >
          <option value=''>{t('home.select')}</option>
          <option value='Male'>{t('home.male')}</option>
          <option value='Female'>{t('home.female')}</option>
          <option value='Other'>{t('home.other')}</option>
        </select>

        <Input
          label={t('home.description')}
          name='description'
          className='w-full p-3 outline-none bor border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400'
          value={info.description}
          onChange={handleChange}
        />

        <div className='mt-4 flex justify-end'>
          <Button
            onClick={handleUpdate}
            className='px-6 py-2 bg-neutral-300 rounded-md hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600'
          >
            {t('home.update')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default EditProfileModal
