import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { sharePost } from '~/apis/post/postThunk'
import { AppDispatch, RootState } from '~/app/appHooks'
import Button from '~/components/atoms/Button'
import Modal from '~/components/atoms/Modal'

type Props = {
  shareId: string
  isOpen: boolean
  closeModal: () => void
}

const GetShareModal: React.FC<Props> = ({ shareId, isOpen, closeModal }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: RootState) => state.user.user)
  const [state, setState] = useState('PUBLIC')
  const [content, setContent] = useState('')

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleShare = async () => {
    await dispatch(sharePost({ content, state, shareId }))
    closeModal()
    toast.success(t('home.sharepost'))
  }

  return (
    <Modal
      title={t('home.share')}
      closeModal={closeModal}
      isOpen={isOpen}
      className='!top-1/2 !left-1/2 w-[600px] -translate-x-1/2 -translate-y-1/2 '
      bgColor='bg-white'
    >
      <div className='p-6 flex flex-col gap-4'>
        <div className='flex items-center gap-3 mb-4'>
          <div className='rounded-full'>
            <img src={data?.imageUrl} className='rounded-full w-14 h-14' />
          </div>
          <div className='flex flex-col items-start gap-1'>
            <p className='font-semibold text-lg'>{data?.fullName}</p>
            <select
              name='state'
              id='state'
              value={state}
              onChange={handleStateChange}
              className='border bg-neutral-400 rounded-md py-1 font-medium w-24 text-sm'
            >
              <option value='PUBLIC'>{t('home.public')}</option>
              <option value='PRIVATE'>{t('home.private')}</option>
            </select>
          </div>
        </div>
        <textarea
          className='border-none focus:border-none outline-none resize-none bg-white p-2 rounded-md w-full'
          placeholder={t('home.whatdosay')}
          value={content}
          onChange={handleContentChange}
        />
        <div className='flex justify-end'>
          <Button
            className='px-6 py-2 bg-neutral-300 hover:bg-neutral-500 rounded-md focus:outline-none '
            onClick={handleShare}
          >
            {t('home.share')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default GetShareModal
