import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import routesName from './enum.routes'
import MainLayout from '~/components/layouts/MainLayout'
import HomePage from '~/components/pages/Home'
import Marketplace from '~/components/pages/Marketplace'
import Gaming from '~/components/pages/Gaming'
import ProfilePage from '~/components/pages/Profile'
import Login from '~/components/pages/Login'
import Register from '~/components/pages/Register'
import PublicRoute from './publicRoute'
import PrivateRoute from './privateRoute'
import FriendRequest from '~/components/organisms/Friend/FriendRequest'
import FriendList from '~/components/organisms/Friend/FriendList'
import Friend from '~/components/pages/Friend'
import WatchList from '~/components/organisms/Watch/WatchList'
import MessagePage from '~/components/pages/Message'
import MessageCard from '~/components/organisms/Message/MessageCard'
import ProfileFriend from '~/components/pages/Profile/ProfileFriend'
import ProfileUser from '~/components/organisms/UserProfile/ProfileUser'
import GroupPage from '~/components/pages/Group'
import WatchPage from '~/components/pages/Watch'
import GroupList from '~/components/organisms/Group/GroupList'

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/404'
          element={
            <div className='flex h-[100vh] w-full items-center justify-center'>
              <p className='text-50px text-primary font-bold'>404</p>
            </div>
          }
        />

        <Route element={<PublicRoute />}>
          <Route path={routesName.LOGIN} element={<Login />} />
          <Route path={routesName.REGISTER} element={<Register />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={routesName.MARKETPLACE} element={<Marketplace />} />
            <Route path={routesName.GAMING} element={<Gaming />} />
            <Route path={routesName.PROFILE} element={<ProfilePage />} />
            <Route path={routesName.PROFILEFRIEND} element={<ProfileFriend />} />
            <Route path={routesName.MESSAGE} element={<MessagePage />} />
            <Route path={routesName.MESSAGECHAT} element={<MessageCard />} />
            <Route path={routesName.PROFILESUER} element={<ProfileUser />} />

            <Route path={routesName.WATCH} element={<WatchPage />}>
              <Route index element={<Navigate to={routesName.WATCHLIST} replace />} />
              <Route path={routesName.WATCHLIST} element={<WatchList />} />
            </Route>

            <Route path={routesName.GROUP} element={<GroupPage />}>
              <Route index element={<Navigate to={routesName.GROUPLIST} replace />} />
              <Route path={routesName.GROUPLIST} element={<GroupList />} />
            </Route>

            <Route path={routesName.FRIEND} element={<Friend />}>
              <Route index element={<Navigate to={routesName.FRIENDREQUEST} replace />} />
              <Route path={routesName.FRIENDREQUEST} element={<FriendRequest />} />
              <Route path={routesName.FRIENDLIST} element={<FriendList />} />
            </Route>
          </Route>
        </Route>

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp
