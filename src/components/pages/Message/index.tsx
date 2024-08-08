import React from 'react'
import SidebarMessage from '~/components/organisms/Message/SidebarMessage'

const MessagePage: React.FC = () => {
  return (
    <div className='flex pt-6 h-screen'>
      <SidebarMessage />
      {/* <MessageCard /> */}
    </div>
  )
}

export default MessagePage
