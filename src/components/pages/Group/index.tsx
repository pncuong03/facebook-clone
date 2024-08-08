import { Outlet } from 'react-router-dom'
import GroupSidebar from '~/components/organisms/Group/GroupSidebar'

const GroupPage: React.FC = () => {
  return (
    <div className='flex gap-6'>
      <GroupSidebar />
      <main className=''>
        <Outlet />
      </main>
    </div>
  )
}

export default GroupPage
