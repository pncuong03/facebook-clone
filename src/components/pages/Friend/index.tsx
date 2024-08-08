import React from 'react'
import { Outlet } from 'react-router-dom'
import FriendSidebar from '~/components/organisms/Friend/FriendSidebar'

const Friend: React.FC = () => {
  return (
    <div className='flex gap-6'>
      <FriendSidebar />
      <main className=''>
        <Outlet />
      </main>
    </div>
  )
}

export default Friend
