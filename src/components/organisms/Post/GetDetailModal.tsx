import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchDetailPost, commentPost, deleteComment } from '~/apis/post/postThunk'
import { AppDispatch, RootState } from '~/app/appHooks'
import Button from '~/components/atoms/Button'
import Modal from '~/components/atoms/Modal'
import PostCardComment from './PostCardComment'
import { ThreedotIcon } from '~/components/atoms/Icons/ThreedotIcon'
import { SendIcon } from '~/components/atoms/Icons/SendIcon'

type Props = {
  postId: string
  isOpen: boolean
  closeModal: () => void
  bgColor: string
}

const GetDetailModal: React.FC<Props> = ({ postId, isOpen, closeModal, bgColor }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const [content, setContent] = useState('')
  const data = useSelector((state: RootState) => state.post.detailPost)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleAddComment = () => {
    if (content.trim()) {
      dispatch(commentPost([postId, content]))
      toast.success(t('home.commentpost'))
      setContent('')
    }
  }

  const hanleDeleteComment = (commentId: any) => {
    dispatch(deleteComment(commentId))
    toast.success(t('home.deletecomment'))
  }

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchDetailPost(postId))
    }
  }, [postId, isOpen, dispatch])

  return (
    <Modal
      title={t('home.comment')}
      closeModal={closeModal}
      isOpen={isOpen}
      bgColor={bgColor}
      className='!top-1/2 !left-1/2 w-[720px] -translate-x-1/2 -translate-y-1/2 lg:-ml-2'
    >
      <div className='space-y-3 max-h-96 md:max-h-[450px] xl:max-h-[600px] overflow-y-auto'>
        <div className='flex flex-col gap-4'>
          <PostCardComment post={data} />
        </div>
        <div className='flex flex-col gap-2 mt-4'>
          {data.comments?.map((comment) => (
            <div key={comment.id} className=' pb-2'>
              <div className='flex items-start gap-2 pl-6'>
                <img src={comment.imageUrl} alt={comment.fullName} className='w-10 h-10 rounded-full' />
                <div className='bg-[#E8E8E8] rounded-2xl p-2'>
                  <p className='font-bold'>{comment.fullName}</p>
                  <p>{comment.comment}</p>
                </div>
                <div className='p-3' onClick={() => hanleDeleteComment(comment.id)}>
                  <ThreedotIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='p-3 items-center flex gap-2'>
          <textarea
            className='h-14 border outline-none focus:border-none resize-none bg-[#F8F8F8] p-3 rounded-2xl w-full'
            placeholder={t('home.whatdosay')}
            value={content}
            onChange={handleContentChange}
          />
          <Button onClick={handleAddComment}>
            <SendIcon />
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default GetDetailModal
