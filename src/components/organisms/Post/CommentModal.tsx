import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { commentPost, deleteComment } from '~/apis/post/postThunk'
import { AppDispatch, RootState } from '~/app/appHooks'
import Button from '~/components/atoms/Button'
import { ThreedotIcon } from '~/components/atoms/Icons/ThreedotIcon'
import { SendIcon } from '~/components/atoms/Icons/SendIcon'

type Props = {
  postId: string
}

const GetComment: React.FC<Props> = ({ postId }) => {
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
  return (
    <div className='max-h-96 md:max-h-[450px] xl:max-h-[600px] overflow-y-auto'>
      <div className='flex flex-col  gap-2 mt-4'>
        {data.comments?.map((comment) => (
          <div key={comment.id} className=' pb-2'>
            <div className='flex items-start gap-2 pl-6'>
              <img src={comment.imageUrl} alt={comment.fullName} className='w-10 h-10 rounded-full' />
              <div className='bg-[#E8E8E8] rounded-2xl p-2'>
                <p className='font-bold text-sm'>{comment.fullName}</p>
                <p className='text-sm'>{comment.comment}</p>
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
  )
}

export default GetComment
