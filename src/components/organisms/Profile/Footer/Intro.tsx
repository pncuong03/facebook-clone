import { useColorScheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Button from '~/components/atoms/Button'
import { GenderIcon } from '~/components/atoms/Icons/GenderIcon'
import { JobIcon } from '~/components/atoms/Icons/JobIcon'
import { IUser } from '~/types/user'

interface IntroProps {
  data: IUser
}
const Intro: React.FC<IntroProps> = ({ data }) => {
  const { t } = useTranslation()
  const { mode } = useColorScheme()
  return (
    <div
      className={`flex flex-col gap-4 rounded-lg  p-3 shadow-md ${mode === 'light' ? 'bg-white' : 'bg-neutral-800'}`}
    >
      <p className='text-xl font-bold '>{t('home.intro')}</p>
      <div className='flex justify-center'>
        <p className='text-md'>{data?.description}</p>
      </div>
      <div className='flex flex-col space-y-4 text-md'>
        <div className='flex items-center space-x-2'>
          <JobIcon />
          <p>Software Engineer</p>
        </div>

        <div className='flex items-center space-x-2'>
          <GenderIcon />
          <p>{data?.gender}</p>
        </div>
      </div>
    </div>
  )
}

export default Intro
