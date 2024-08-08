import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLikePost } from '~/apis/post/postThunk'
import { AppDispatch, RootState } from '~/app/appHooks'
import Modal from '~/components/atoms/Modal'

type Props = {
  postId: string
  isOpen: boolean
  closeModal: () => void
  bgColor: string
}

const GetLikeModal: React.FC<Props> = ({ postId, isOpen, closeModal, bgColor }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: RootState) => state.post.listLike)

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchLikePost(postId))
    }
  }, [isOpen, postId, dispatch])

  return (
    <Modal
      title={t('home.all')}
      closeModal={closeModal}
      isOpen={isOpen}
      bgColor={bgColor}
      className='!top-1/2 !left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 lg:pl-2'
    >
      <div className='p-6'>
        <ul className='max-h-96 overflow-y-auto'>
          {data?.map((like, idx) => (
            <li key={idx} className='flex h-12 items-center space-x-3 rounded-md p-2 cursor-pointer '>
              <div>
                <img className='h-10 w-11 rounded-full' src={like.imageUrl} />
              </div>
              <div>
                <p className='text-md font-semibold text-black-100 '>{like.fullName}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  )
}

export default GetLikeModal
