import React, { useEffect, useState } from 'react'
import { List, ListItem, useColorScheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { fetchSearchUser } from '~/apis/user/userThunk'
import Input from '~/components/atoms/Input'
import { ISearchUser } from '~/types/user'
import { useNavigate } from 'react-router-dom'
import { acceptRequest, deleteRequestFriend, sendRequest } from '~/apis/friend/friendThunk'
import Button from '~/components/atoms/Button'
import { AppDispatch, RootState } from '~/app/appHooks'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const SearchComponent: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { mode } = useColorScheme()
  const [search, setSearch] = useState<string>('')
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [listUser, setListUser] = useState<ISearchUser[]>([])
  const data = useSelector((state: RootState) => state.user.searchUser)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setShowDropdown(false)
  }

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (search) {
        dispatch(fetchSearchUser(search))
        setListUser(data)
        setShowDropdown(true)
      } else {
        setListUser([])
        setShowDropdown(false)
      }
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [search, data, dispatch])

  const handleSendRequest = (id: string) => {
    dispatch(sendRequest(id))
    toast.success(t('home.sendrequest'))
  }

  const handleAccept = (id: string) => {
    dispatch(acceptRequest(id))
    toast.success(t('home.acceptrequest'))
  }

  const handleDeleteRequest = async (id: string) => {
    dispatch(deleteRequestFriend(id))
    toast.success(t('home.deleterequest'))
  }

  const handleNavigate = (user: ISearchUser) => {
    setSearch('')
    setShowDropdown(false)
    navigate('/profile/user', { state: { user } })
  }

  return (
    <div className='relative'>
      <div className='hidden xl:flex '>
        <Input
          placeholder={t('home.search')}
          className={`rounded-full border ${mode === 'light' ? 'bg-neutral-400' : 'bg-neutral-700 border-neutral-700'}`}
          value={search}
          onChange={handleChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        <div>
          {showDropdown && (
            <div
              className={`absolute top-full mt-2 -left-12 w-80 ${mode === 'light' ? 'bg-white' : 'bg-black-700'} shadow-lg rounded-b-lg`}
            >
              <List className='flex flex-col gap-3 '>
                {listUser?.map((user: ISearchUser) => (
                  <ListItem
                    key={user?.id}
                    className={` ${mode === 'light' ? 'hover:bg-gray-100' : 'hover:bg-neutral-600'} p-2 rounded-md`}
                    onClick={() => handleNavigate(user)}
                  >
                    <button className='flex items-center gap-3 p-2'>
                      <div className='h-10 w-10'>
                        <img src={user?.imageUrl} className='h-full w-full rounded-full' alt='dp' />
                      </div>

                      <div className='flex flex-col'>
                        <p className='text-md font-normal'>{user?.fullName}</p>
                        {/* {user?.isFriend ? (
                          <div>
                            <p className='text-md font-normal text-sm text-neutral-200'>{t('home.friend')}</p>
                          </div>
                        ) : user?.hadSendFriendRequest ? (
                          <Button onClick={() => handleDeleteRequest(user?.id)} className='text-sm text-neutral-200'>
                            {t('home.deleterequest')}
                          </Button>
                        ) : user?.hadReceiverFriendRequest ? (
                          <Button onClick={() => handleAccept(user?.id)} className='text-sm text-neutral-200'>
                            {t('home.acept')}
                          </Button>
                        ) : (
                          <Button onClick={() => handleSendRequest(user?.id)} className='text-sm text-neutral-200'>
                            {t('home.addfriend')}
                          </Button>
                        )} */}
                      </div>
                    </button>
                  </ListItem>
                ))}
              </List>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchComponent
