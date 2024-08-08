import { useColorScheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

const Advertis = () => {
  const { t } = useTranslation()
  const { mode } = useColorScheme()
  return (
    <div className={`p-4 rounded-lg shadow-md ${mode === 'light' ? 'bg-white' : 'bg-black-300'}`}>
      <p className='mb-2 font-semibold text-lg'>{t('home.advertisment')}</p>
      <div className='flex flex-col gap-3 font-medium'>
        <div className='flex gap-4 items-center '>
          <img
            className='md:h-28 w-[150px] object-cover rounded-2xl'
            src='https://random.imagecdn.app/600/200'
            alt='advertisment'
          />
          <div className='font-inherit text-sm'>
            <p>PLAY FOR FREE</p>
            <a className='text-gray-400' href='https://www.xfarm.shop/'>
              xfarm.shop
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Advertis
