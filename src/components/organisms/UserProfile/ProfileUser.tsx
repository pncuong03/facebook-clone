import React, { useEffect } from 'react'
import { useColorScheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { acceptRequest, deleteRequestFriend, sendRequest } from '~/apis/friend/friendThunk'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/app/appHooks'
import { useLocation } from 'react-router-dom'
import Album from '../Profile/Footer/Album'
import Button from '~/components/atoms/Button'
import { fetchPostFriend } from '~/apis/post/postThunk'
import PostCard from '../Post/PostCard'

const posts = [
  {
    id: 8,
    userId: 2,
    state: 'PUBLIC',
    fullName: 'Nguyễn Thị Tuyết',
    imageUrl: 'http://res.cloudinary.com/ds9ipqi3z/image/upload/v1710954680/bpnracdpkspbzt0njy8n.png',
    createdAt: '2024-08-07T04:28:41.943433',
    content: "Khung cảnh từ đài quan sát 'Cầu Hai Hồ' phía trên Interlaken, đầy ngoạn mục",
    imageUrls: ['http://res.cloudinary.com/ds9ipqi3z/image/upload/v1722979679/jhdrnfzg9drpjpkrir1k.jpg'],
    shareId: null,
    sharePost: null,
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    comments: null,
    hasLike: null,
    type: 'USER'
  },
  {
    id: 9,
    userId: 2,
    state: 'PUBLIC',
    fullName: 'Nguyễn Thị Tuyết',
    imageUrl: 'http://res.cloudinary.com/ds9ipqi3z/image/upload/v1710954680/bpnracdpkspbzt0njy8n.png',
    createdAt: '2024-08-07T04:29:17.156077',
    content:
      'Bức hình chụp lại cảnh đoàn tàu bánh răng Jungfraubahn đang đi xuống từ đỉnh Jungfraujoch, ở độ cao 3.454m so với mực nước biển',
    imageUrls: ['http://res.cloudinary.com/ds9ipqi3z/image/upload/v1722979714/qem0w59wmxukc95u7baw.jpg'],
    shareId: null,
    sharePost: null,
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    comments: null,
    hasLike: null,
    type: 'USER'
  },
  {
    id: 10,
    userId: 2,
    state: 'PUBLIC',
    fullName: 'Nguyễn Thị Tuyết',
    imageUrl: 'http://res.cloudinary.com/ds9ipqi3z/image/upload/v1710954680/bpnracdpkspbzt0njy8n.png',
    createdAt: '2024-08-07T04:29:52.513012',
    content:
      'Một trong những điểm tham quan mà hành khách trên tuyến đường sắt Jungfraubahn nhìn thấy trong hành trình của họ là vùng nước màu xanh ngọc lục bảo của Hồ Fallboden, ở độ cao 2.100 mét so với mực nước biển',
    imageUrls: ['http://res.cloudinary.com/ds9ipqi3z/image/upload/v1722979750/gilk7hl8l10jdyn6gzdj.jpg'],
    shareId: null,
    sharePost: null,
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    comments: null,
    hasLike: null,
    type: 'USER'
  },
  {
    id: 11,
    userId: 4,
    state: 'PUBLIC',
    fullName: 'Phạm Thị Hà Anh',
    imageUrl: 'http://res.cloudinary.com/ds9ipqi3z/image/upload/v1710954680/bpnracdpkspbzt0njy8n.png',
    createdAt: '2024-08-07T04:31:52.805866',
    content: 'Môn thể thao ưu thích của tôi',
    imageUrls: ['http://res.cloudinary.com/ds9ipqi3z/image/upload/v1722979870/fw3myiheuvu8ex4y4zf5.jpg'],
    shareId: null,
    sharePost: null,
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    comments: null,
    hasLike: null,
    type: 'USER'
  }
]

const ProfileUser: React.FC = () => {
  const { t } = useTranslation()
  const { mode } = useColorScheme()
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const data = location.state.user

  const handleSendRequest = () => {
    dispatch(sendRequest(data?.id))
    toast.success(t('home.sendrequest'))
  }

  const handleAccept = () => {
    dispatch(acceptRequest(data?.id))
    toast.success(t('home.acceptrequest'))
  }

  const handleDeleteRequest = async () => {
    dispatch(deleteRequestFriend(data?.id))
    toast.success(t('home.deleterequest'))
  }

  return (
    <div>
      <div className={`h-auto w-full shadow ${mode === 'light' ? 'bg-white' : 'bg-neutral-800'}`}>
        <div className={`mx-auto h-full max-w-6xl rounded-md ${mode === 'light' ? 'bg-white' : 'bg-neutral-800'}`}>
          <div className='relative h-[15rem] xl:h-[30rem] max-h-[28.75rem] w-full rounded-lg bg-cover bg-center bg-no-repeat bg-default'></div>
          <div className='flex flex-col lg:flex-row items-center lg:justify-between pb-5 '>
            <div className='flex flex-col lg:flex-row lg:gap-4 items-center mx-auto lg:mx-8'>
              <div className='z-0 -mt-20 lg:-mt-8 h-[12rem] w-[12rem]'>
                <img className='h-full w-full rounded-full border-4 border-primary' src={data?.imageUrl} alt='dp' />
              </div>
              <div className='flex flex-col items-center lg:items-start'>
                <p className='text-[2rem] font-bold '>{data?.fullName}</p>
                <a className='cursor-pointer text-sm font-semibold text-gray-400 '>528 {t('home.friend')}</a>
              </div>
            </div>
            <div className='p-3 md:mx-auto lg:mx-6'>
              {data?.isFriend ? (
                <p className='w-full rounded-md px-3 text-xl font-semibold bg-neutral-400 '>{t('home.friend')}</p>
              ) : data?.hadSendFriendRequest ? (
                <Button onClick={() => handleDeleteRequest()} className='w-full rounded-md px-3 font-semibold  '>
                  <p className=' text-gray-600  dark:text-gray-300'>{t('home.deleterequest')} </p>
                </Button>
              ) : data?.hadReceiverFriendRequest ? (
                <Button
                  onClick={() => handleAccept()}
                  className='w-full rounded-md px-3 font-semibold bg-neutral-400 dark:bg-neutral-600 '
                >
                  <p className=' text-gray-600  dark:text-gray-300'> {t('home.acept')}</p>
                </Button>
              ) : (
                <Button
                  onClick={() => handleSendRequest()}
                  className='w-full rounded-md px-3 font-semibold bg-neutral-400 dark:bg-neutral-600 '
                >
                  <p className=' text-gray-600  dark:text-gray-300'> {t('home.addfriend')}</p>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='mx-auto w-full lg:grid grid-cols-3 gap-4 h-full mt-6 px-3 md:px-6 lg:px-14 2xl:px-96'>
        <div className='grid gap-4 mb-4 col-span-1 h-fit'>
          <div
            className={`flex flex-col gap-4 rounded-lg p-3 shadow ${mode === 'light' ? 'bg-white' : 'bg-neutral-800'}`}
          >
            <p className='text-xl font-bold '>{t('home.intro')}</p>
            <div className='flex justify-center'>
              <p className='text-sm'>Heloo</p>
            </div>
            <div className='flex flex-col space-y-4 text-sm'>
              <div className='flex items-center space-x-2'>
                <span>
                  <i className='fas fa-briefcase text-[1.25rem] text-gray-400'></i>
                </span>
                <p>Software Engineer</p>
              </div>

              <div className='flex items-center space-x-2'>
                <span>
                  <i className='fab fa-instagram text-[1.25rem] text-gray-400'></i>
                </span>
                <a
                  className='cursor-pointer hover:underline'
                  target='_blank'
                  rel='noopener noreferrer'
                  href={'https://instagram.com/_shiha6'}
                >
                  <p>_shiha6</p>
                </a>
              </div>
            </div>
          </div>
          <Album />
          <div className={`flex flex-col gap-4 rounded-lg p-3 ${mode === 'light' ? 'bg-white' : 'bg-neutral-800'}`}>
            <div className='flex justify-between'>
              <div>
                <p className='text-xl font-bold '> {t('home.friend')}</p>
                <p className='text-sm text-gray-400'>
                  {data.length} {t('home.friend')}
                </p>
              </div>
              <a className='cursor-pointer text-sm text-primary hover:underline'>{t('home.seeallfriend')}</a>
            </div>
            {/* <div className='grid grid-cols-3 gap-4'>
              {data?.map((item: any) => (
                <div key={item.id}>
                  <img className='w-full rounded-md' alt='photo' src={item.imageUrl} />
                  <p className='mt-2 text-sm text-black dark:text-gray-200'>{item.fullName}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
        <div className='grid gap-2 col-span-2 '>
          <div className='h-full w-full'>
            <div className='grid gap-2 grid-cols-1'>
              {posts ? posts.map((post: any, idx) => <PostCard key={idx} post={post} />) : <p>No posts yet!</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileUser
