import React from 'react'
import { Outlet } from 'react-router-dom'
import WatchSidebar from '~/components/organisms/Watch/WatchSidebar'

const WatchPage: React.FC = () => {
  return (
    <div className='flex gap-6'>
      <WatchSidebar />
      <main className=''>
        <Outlet />
      </main>
    </div>
  )
}

export default WatchPage
