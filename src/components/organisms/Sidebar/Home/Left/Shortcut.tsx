import React from 'react'
import Contacts from '../Right/Contacts'
import { useTranslation } from 'react-i18next'

const ShortCut = () => {
  const { t } = useTranslation()
  return (
    <div className=''>
      <p className='font-semibold text-black'>{t('home.yourshortcut')}</p>
    </div>
  )
}

export default ShortCut
