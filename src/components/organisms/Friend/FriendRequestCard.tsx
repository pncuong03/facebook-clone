import { useColorScheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { acceptRequest, rejectRequest } from '~/apis/friend/friendThunk'
import { AppDispatch } from '~/app/appHooks'
import Button from '~/components/atoms/Button'
import { IFriend } from '~/types/friend'

interface IProps {
  data: IFriend
}
const FriendRequestCard: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { mode } = useColorScheme()

  const handleReject = () => {
    dispatch(rejectRequest(data?.id))
    toast.error(t('home.rejectrequest'))
  }

  const handleAccept = () => {
    dispatch(acceptRequest(data?.id))
    toast.success(t('home.acceptrequest'))
  }
  return (
    <div
      className={`rounded-2xl border-2 border-gray-300 md:w-60 w-44 flex flex-col ${mode === 'light' ? 'bg-neutral-400' : 'bg-black-700'} `}
    >
      <div>
        <img src={data.imageUrl} className='md:h-56 h-36 rounded-2xl w-full' />
      </div>
      <div className='pl-3 pt-2'>
        <p className='font-semibold text-lg h-10'>{data.fullName}</p>
        {/* <p className='font-thin text-neutral-200'>26 bạn chung</p> */}
      </div>
      <div className='p-3 flex flex-col gap-1'>
        <Button onClick={handleAccept} className='bg-blue-600 text-white w-full rounded-lg'>
          {t('home.accept')}
        </Button>
        <Button onClick={handleReject} className='bg-neutral-200 text-white w-full rounded-lg'>
          {t('home.delete')}
        </Button>
      </div>
    </div>
  )
}

export default FriendRequestCard
