import { useColorScheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { fetchListChat, fetchListMessage, sendMessage } from '~/apis/message/messageThunk'
import { AppDispatch, RootState } from '~/app/appHooks'
import Button from '~/components/atoms/Button'
import { SendIcon } from '~/components/atoms/Icons/SendIcon'
import Input from '~/components/atoms/Input'
import TimeComparison from '~/const/dateFormat'

const SidebarMessage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { mode } = useColorScheme()
  const listChat = useSelector((state: RootState) => state.message.listChat)
  const listMessage = useSelector((state: RootState) => state.message.listMessage)
  const [search, setSearch] = useState<string>('')
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [content, setContent] = useState<string>('')
  console.log(selectedChat)

  useEffect(() => {
    dispatch(fetchListChat())
  }, [dispatch])

  useEffect(() => {
    if (selectedChat) {
      dispatch(fetchListMessage(selectedChat))
    }
  }, [selectedChat, dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleChatClick = (chatId: string) => {
    setSelectedChat(chatId)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleAddComment = () => {
    if (content.trim() && selectedChat) {
      dispatch(sendMessage({ chatId: selectedChat, message: content }))
      setContent('')
    }
  }

  return (
    <div className='flex w-screen h-screen fixed'>
      <div className='flex flex-col gap-5 w-[500px] bg-white p-4 overflow-y-auto h-screen'>
        <p className='text-3xl font-semibold'>Doan chat</p>
        <Input
          placeholder='Tim kiem tren doan chat'
          className={`rounded-full h-10 border ${mode === 'light' ? 'bg-white' : 'bg-neutral-700'}`}
          value={search}
          onChange={handleChange}
        />
        {listChat?.map((chat) => (
          <div key={chat.id} className='flex flex-col w-full'>
            <div className='flex gap-3 items-center cursor-pointer' onClick={() => handleChatClick(chat.id)}>
              <img src={chat.imageUrl} className='h-16 w-16 rounded-full' alt='dp' />
              <div className='flex flex-col'>
                <p className='font-normal text-xl'>{chat.name}</p>
                <div className='flex gap-3 text-neutral-200 text-lg font-thin'>
                  <p>{chat.newestMessage}</p>
                  <p>
                    <TimeComparison time={chat.newestChatTime} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-col w-full h-screen'>
        <div className='flex-grow overflow-y-auto flex flex-col-reverse p-4 bg-gray-200'>
          {selectedChat !== null ? (
            listMessage?.map((message) =>
              message.isMe ? (
                <div key={message.id} className='flex items-center gap-3 p-4 justify-end'>
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
            )
          ) : (
            <p>Khong co tin nhan nao</p>
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
    </div>
  )
}

export default SidebarMessage
