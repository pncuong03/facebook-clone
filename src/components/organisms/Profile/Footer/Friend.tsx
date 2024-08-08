import { useColorScheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { IFriend } from '~/types/friend'

export interface FriendProfileProps {
  data: IFriend[]
}
const FriendProfile: React.FC<FriendProfileProps> = ({ data }) => {
  const { t } = useTranslation()
  const { mode } = useColorScheme()
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/friend/list')
  }
  return (
    <div className={`flex flex-col gap-4 rounded-lg p-3 shadow-md ${mode === 'light' ? 'bg-white' : 'bg-neutral-800'}`}>
      <div className='flex justify-between'>
        <div>
          <p className='text-xl font-bold '> {t('home.friend')}</p>
          <p className='text-sm text-gray-400'>
            {data.length} {t('home.friend')}
          </p>
        </div>
        <button onClick={handleNavigate} className='cursor-pointer text-sm text-primary hover:underline'>
          {t('home.seeallfriend')}
        </button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {data?.map((item: any) => (
          <div key={item.id}>
            <img className='w-full h-24 rounded-lg' alt='photo' src={item.imageUrl} />
            <p className='mt-2 text-sm text-black dark:text-gray-200'>{item.fullName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FriendProfile
