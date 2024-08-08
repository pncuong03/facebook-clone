import React from 'react'
import GroupCard from './GroupCard'

const postData = [
  {
    id: 1,
    fullName: 'Cường',
    createdAt: '2024-08-01T12:34:56Z',
    content:
      'Hôm nay là một ngày thật tuyệt vời, tôi đã hoàn thành dự án của mình sớm hơn dự kiến và có thời gian để tận hưởng một tách cà phê.',
    imageUrl: 'https://picsum.photos/200/200?random=1',
    imageUrls: 'https://picsum.photos/900/600?random=7',
    likeCount: 10,
    commentCount: 5,
    shareCount: 2
  },
  {
    id: 2,
    fullName: 'Hà Anh',
    createdAt: '2024-08-01T10:22:33Z',
    content:
      'Cuối tuần này, tôi đã có một chuyến đi thú vị đến vùng biển xanh ngắt, cảnh đẹp và không khí trong lành thật tuyệt vời!',
    imageUrl: 'https://picsum.photos/200/200?random=2',
    imageUrls: 'https://picsum.photos/900/600?random=2',
    likeCount: 20,
    commentCount: 10,
    shareCount: 5
  },
  {
    id: 3,
    fullName: 'Tuyết',
    createdAt: '2024-08-01T08:11:22Z',
    content:
      'Tôi vừa mới đọc xong một cuốn sách rất hay, cuốn sách đã thay đổi cách nhìn của tôi về cuộc sống và con người.',
    imageUrl: 'https://picsum.photos/200/200?random=3',
    imageUrls: 'https://picsum.photos/900/600?random=3',
    likeCount: 15,
    commentCount: 7,
    shareCount: 3
  },
  {
    id: 4,
    fullName: 'Hải',
    createdAt: '2024-08-01T06:00:00Z',
    content:
      'Bài tập thể dục buổi sáng giúp tôi cảm thấy tràn đầy năng lượng và sẵn sàng cho một ngày làm việc hiệu quả.',
    imageUrl: 'https://picsum.photos/200/200?random=4',
    imageUrls: 'https://picsum.photos/900/600?random=4',
    likeCount: 25,
    commentCount: 12,
    shareCount: 6
  }
]

const GroupList = () => {
  return (
    <div className='h-full w-full pt-16 pl-[700px] pr-[300px]'>
      <div className='w-full max-w-4xl px-6'>
        <GroupCard data={postData} />
      </div>
    </div>
  )
}

export default GroupList
