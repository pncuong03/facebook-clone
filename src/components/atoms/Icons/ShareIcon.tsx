import { useColorScheme } from '@mui/material'

type IconProps = React.SVGAttributes<unknown> & {
  liked?: boolean
}
export function ShareIcon({ liked, ...props }: IconProps) {
  const { mode } = useColorScheme()
  const fillColor = liked ? '#1877f2' : mode === 'light' ? 'black' : 'white'

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='2.5em'
      height='1.5em'
      viewBox='0 0 512 512'
      fill={fillColor}
      {...props}
    >
      <path d='M506.28,421.81H186.1a5.72,5.72,0,0,1-4-9.76L294.7,299.42c-30.85-35.39-75.83-55.57-124.23-55.57-78.93,0-145.85,53.62-159.12,127.52A5.65,5.65,0,0,1,5,376,5.71,5.71,0,0,1,0,369.84C23.1,116,231.11,113.06,233.21,113.06c66.38,0,129.54,26.73,174.27,73.56l94.76-94.75a5.72,5.72,0,0,1,9.76,4V416.09A5.71,5.71,0,0,1,506.28,421.81ZM199.91,410.37H500.57V109.71l-89.18,89.18a6,6,0,0,1-4.18,1.68,5.75,5.75,0,0,1-4.1-1.88c-42.76-47.15-104.68-74.19-169.89-74.19-7.47,0-169.51,2.66-213.14,191.27,29.93-50.4,86.49-83.35,150.39-83.35,53.62,0,103.34,23.22,136.42,63.71a5.71,5.71,0,0,1-.39,7.66Z' />
    </svg>
  )
}
