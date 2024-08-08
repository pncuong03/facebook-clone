import React from 'react'
import Advertis from './Advertise'
import { useTranslation } from 'react-i18next'
import Contacts from './Contacts'

const RightSidebar: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div
      className={`h-[calc(100vh-56px)] hover:overflow-y-auto lg:w-96 mt-14 py-3 pr-8 lg:flex flex-col gap-8  hidden`}
    >
      <Advertis />
      <Contacts />
    </div>
  )
}

export default RightSidebar
