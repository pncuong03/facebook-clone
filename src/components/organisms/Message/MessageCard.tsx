import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchListMessage } from '~/apis/message/messageThunk'
import { AppDispatch, RootState } from '~/app/appHooks'
import Button from '~/components/atoms/Button'
import { SendIcon } from '~/components/atoms/Icons/SendIcon'
import TimeComparison from '~/const/dateFormat'

interface MessageProps {
  chatId: string
}
const MessageCard: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const listMessage = useSelector((state: RootState) => state.message.listMessage)
  const [content, setContent] = useState<string>('')
  const { chatId } = useParams<{ chatId: string }>()
  // useEffect(() => {
  //   if (chatId) {
  //     dispatch(fetchListMessage(chatId))
  //   }
  // }, [chatId, dispatch])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleAddComment = () => {
    if (content.trim()) {
      // dispatch(sendMessage({ chatId: chatId, message: content }))
      setContent('')
    }
  }
  return (
    <div className=''>
      <div className='flex-grow overflow-y-auto flex flex-col-reverse p-4 bg-gray-200'>
        {listMessage?.map((message) =>
          message.isMe ? (
            <div key={message.chatId} className='flex items-center gap-3 p-4 justify-end'>
              <p className='text-xl bg-blue-300 rounded-full w-auto p-2'>{message.message}</p>
              <p>
                <TimeComparison time={message.createdAt} />
              </p>
            </div>
          ) : (
            <div key={message.chatId} className='flex items-center gap-3 p-4'>
              <img src={message.imageUrl} className='h-12 w-12 rounded-full' alt='dp' />
              <p className='text-xl bg-gray-300 rounded-full w-auto p-2'>{message.message}</p>
              <p>
                <TimeComparison time={message.createdAt} />
              </p>
            </div>
          )
        )}
      </div>

      <div className='p-3 mb-20 items-center flex gap-2'>
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

export default MessageCard
