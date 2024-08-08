import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import WatchCard from './WatchCard'

const WatchList = () => {
  const navigate = useNavigate()

  return (
    <div className='h-full w-full pt-16 pl-[700px] pr-[300px]'>
      <WatchCard />
    </div>
  )
}

export default WatchList
