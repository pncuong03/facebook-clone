import React, { useEffect, useRef, useState } from 'react'
import { List, ListItem, CircularProgress, Typography, useColorScheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/app/appHooks'
import { fetchListNoti } from '~/apis/noti/notiThunk'
import { setPage, deleteNoti } from '~/slices/noti/notiSlice'
import TimeComparison from '~/const/dateFormat'
import { formatNoti } from '~/const/actionFormat'
import { useTranslation } from 'react-i18next'
import GetDetailModal from '../Post/GetDetailModal'

interface NotificationsComponentProps {
  isOpen: boolean
  onClose: () => void
}

const Notification: React.FC<NotificationsComponentProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()
  const { mode } = useColorScheme()
  const notifications = useSelector((state: RootState) => state.noti.notification)
  const currentPage = useSelector((state: RootState) => state.noti.currentPage)
  const pageSize = useSelector((state: RootState) => state.noti.pageSize)
  const hasMore = useSelector((state: RootState) => state.noti.hasMore)
  const [loading, setLoading] = useState(false)
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<any>(null)
  const notiRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchListNoti({ page: 0, size: pageSize }))
    }
    dispatch(deleteNoti())
  }, [isOpen, dispatch, pageSize])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notiRef.current && !notiRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.currentTarget
    const isAtBottom = target.scrollHeight === target.scrollTop + target.clientHeight

    if (isAtBottom && hasMore && !loading) {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      const timeoutId = setTimeout(() => {
        setLoading(true)
        dispatch(setPage(currentPage + 1))
        dispatch(fetchListNoti({ page: currentPage + 1, size: pageSize })).finally(() => setLoading(false))
      }, 1000)

      setScrollTimeout(timeoutId)
    }
  }

  const handleNotificationClick = (notification: any) => {
    if (['LIKE', 'COMMENT', 'SHARE'].includes(notification.interactType)) {
      setSelectedNotification(notification)
      setModalOpen(true)
    }
    onClose()
  }

  return (
    <div ref={notiRef} className='relative'>
      {isOpen && (
        <div
          className={`absolute top-6 -right-14 mt-2 w-[360px] md:w-96 max-h-[600px] border ${mode === 'light' ? 'bg-white ' : 'bg-black-700 border-black-700'}  shadow-lg rounded-b-xl overflow-y-auto`}
          onScroll={handleScroll}
        >
          <div
            className={`flex justify-between p-3 border-b-[2px] ${mode === 'light' ? 'border-neutral-400' : 'border-neutral-200'} mb-3`}
          >
            <h2 className='text-[24px] font-semibold'>{t('home.noti')}</h2>
          </div>
          <List className='flex flex-col gap-3 '>
            {notifications.length > 0 &&
              notifications.map((notification: any) => (
                <ListItem
                  key={notification.id}
                  className='flex gap-2 cursor-pointer'
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className='h-14 w-14'>
                    <img src={notification.interact.imageUrl} className='h-full w-full rounded-full' alt='dp' />
                  </div>
                  <div className='flex flex-grow flex-col'>
                    <p className='text-md font-semibold text-black max-w-[280px] break-words'>
                      {notification.interact.fullName} {formatNoti(notification.interactType, t)}
                    </p>
                    <span className='text-xs font-normal text-gray-400'>
                      <TimeComparison t={t} time={notification.createdAt} />
                    </span>
                  </div>
                </ListItem>
              ))}

            {!hasMore && !loading && (
              <Typography variant='body2' color='textSecondary' className='text-center p-4'>
                {t('home.nonoti')}
              </Typography>
            )}
            {loading && (
              <div className='flex justify-center p-4'>
                <CircularProgress color='inherit' />
              </div>
            )}
          </List>
        </div>
      )}
      {selectedNotification && (
        <GetDetailModal
          bgColor='bg-neutral-400'
          isOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
          postId={selectedNotification.postId}
        />
      )}
    </div>
  )
}

export default Notification
