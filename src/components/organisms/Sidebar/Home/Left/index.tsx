import React from 'react'
import Leftbar from './Leftbar'
import { useColorScheme } from '@mui/material'

const LeftSidebar: React.FC = () => {
  const { mode } = useColorScheme()
  return (
    <div
      className={`h-[calc(120vh-56px)] shadow-sm ${mode === 'light' ? 'bg-white' : 'bg-black-300'} rounded-xl mt-16 w-[23rem] hover:overflow-y-auto py-3 xl:flex flex-col hidden`}
    >
      <Leftbar />
    </div>
  )
}

export default LeftSidebar
