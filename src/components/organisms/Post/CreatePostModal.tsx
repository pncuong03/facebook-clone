import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from '~/components/atoms/Modal'
import Button from '~/components/atoms/Button'
import { Box, CircularProgress } from '@mui/material'
import { AppDispatch, RootState } from '~/app/appHooks'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '~/apis/post/postThunk'
import { toast } from 'react-toastify'

type Props = {
  isOpen: boolean
  closeModal: () => void
  bgColor: string
}

const CreatePostModal: React.FC<Props> = ({ isOpen, closeModal, bgColor }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: RootState) => state.user.user)

  const [content, setContent] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [state, setState] = useState('PUBLIC')
  const [isLoading, setIsLoading] = useState(false)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImages = Array.from(e.target.files)
      setImages([...images, ...selectedImages])
    }
  }

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    setImages(updatedImages)
  }

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value)
  }

  const handleSubmit = async () => {
    if (!content || isLoading) return
    const formData = new FormData()
    const createPostInputString = JSON.stringify({ content, state })
    formData.append('createPostInputString', createPostInputString)

    images.forEach((image, index) => {
      formData.append('images', image)
    })

    dispatch(createPost(formData))
    toast.success(t('home.createpost'))
    setImages([])
    setContent('')
    setIsLoading(false)
    closeModal()
  }

  return (
    <Modal
      title={t('home.createarticle')}
      closeModal={closeModal}
      isOpen={isOpen}
      bgColor={bgColor}
      className='!top-1/2 !left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 lg:ml-18'
    >
      <div className='p-6'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='rounded-full '>
            <img src={data?.imageUrl} className='rounded-full w-14 h-14' />
          </div>
          <div className='flex flex-col items-start gap-1'>
            <p className='font-semibold text-lg'>{data?.fullName}</p>
            <select
              name='state'
              id='state'
              value={state}
              onChange={handleStateChange}
              className=' bg-gray-100 border   rounded-md py-1 font-medium w-24 text-sm'
            >
              <option value='PUBLIC'>{t('home.public')}</option>
              <option value='PRIVATE'>{t('home.private')}</option>
            </select>
          </div>
        </div>
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder={t('home.whatmind')}
          className='w-full h-20 mt-2 p-2 rounded-md border-none focus:border-none outline-none resize-none bg-neutral-400'
        />
        <div className='flex flex-col items-center mt-4'>
          <label htmlFor='image-upload' className='mr-2'>
            {t('home.addtoyourpost')}
          </label>
          <input
            id='image-upload'
            type='file'
            onChange={handleImageChange}
            className='hidden'
            multiple
            accept='image/*'
          />
          <div className='flex flex-wrap gap-1'>
            {images.map((image, index) => (
              <div key={index} className='relative'>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index}`}
                  className='w-52 h-52 object-cover rounded-md border border-gray-300'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='absolute top-0 right-0 h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 text-gray-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-4 flex justify-end'>
          <Button
            onClick={handleSubmit}
            className={`rounded-md bg-neutral-300 hover:bg-neutral-500 ${!content || isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {/* {isLoading ? (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            ) : (
              t('home.post')
            )} */}
            {t('home.post')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CreatePostModal
