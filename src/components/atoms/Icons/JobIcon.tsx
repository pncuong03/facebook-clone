import { useColorScheme } from '@mui/material'

export function JobIcon(props: React.SVGAttributes<unknown>) {
  const { mode } = useColorScheme()
  const fillColor = mode === 'light' ? 'black' : 'white'

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      width='2.25em'
      height='1.25em'
      fill={fillColor}
      {...props}
    >
      <path d='M320 336c0 8.8-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c25.6 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-25.6 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z' />
    </svg>
  )
}
