import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { acceptRequest, deleteFriend, rejectRequest } from '~/apis/friend/friendThunk'
import { AppDispatch } from '~/app/appHooks'
import Button from '~/components/atoms/Button'
import { IFriend } from '~/types/friend'

interface IProps {
  data: IFriend
}
const FriendCard: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const handleDelete = () => {
    dispatch(deleteFriend(data?.id))
  }

  return (
    <Link
      to={`/profile/${data?.id}`}
      className='rounded-2xl border border-neutral-300  md:w-60 w-44  flex flex-col
      '
    >
      <div>
        <img src={data.imageUrl} className='md:h-56 h-36 rounded-2xl w-full' />
      </div>
      <div className='pl-3 pt-2'>
        <p className='font-semibold text-lg h-10'>{data.fullName}</p>
      </div>
      <div className='p-3 flex flex-col gap-1'>
        <Button onClick={handleDelete} className='bg-neutral-200 text-white w-full rounded-lg'>
          {t('home.delete')}
        </Button>
      </div>
    </Link>
  )
}

export default FriendCard
