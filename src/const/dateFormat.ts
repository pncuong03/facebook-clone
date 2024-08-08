import React, { useEffect } from 'react'
import moment from 'moment'

interface TimeComparisonProps {
  time: string
  t: (key: string) => string
}

const TimeComparison: React.FC<TimeComparisonProps> = ({ time, t }) => {
  useEffect(() => {
    const interval = setInterval(() => {}, 1000)

    return () => clearInterval(interval)
  }, [])

  const getTimeDifferenceText = () => {
    const diff = moment().diff(moment(time))

    if (diff < 60000) {
      return t('home.justnow')
    } else if (diff < 3600000) {
      const minutes = moment().diff(moment(time), 'minute')
      return minutes > 1 ? `${minutes} ${t('home.minute')}` : `1 ${t('home.minute')}`
    } else if (diff < 86400000) {
      const hours = moment().diff(moment(time), 'hour')
      return hours > 1 ? `${hours} ${t('home.hour')}` : `1 ${t('home.hour')}`
    } else if (diff < 30 * 24 * 3600000) {
      const days = moment().diff(moment(time), 'day')
      return days > 1 ? `${days} ${t('home.day')}` : `1 ${t('home.day')}`
    } else {
      return moment(time).format('YYYY-MM-DD')
    }
  }

  return React.createElement('div', null, getTimeDifferenceText())
}

export default TimeComparison
