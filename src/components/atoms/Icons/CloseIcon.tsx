import React from 'react'

export function CloseIcon(props: React.SVGAttributes<unknown>) {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <line x1='18' y1='6' x2='6' y2='18'></line>

      <line x1='6' y1='6' x2='18' y2='18'></line>
    </svg>
  )
}
