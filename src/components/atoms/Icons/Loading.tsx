import React from 'react'

export function Loading(props: React.SVGAttributes<unknown>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      style={{ background: 'none', display: 'block', shapeRendering: 'auto' }}
      width='28px'
      height='28px'
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
    >
      <circle
        cx='50'
        cy='50'
        fill='none'
        stroke='#414141'
        strokeWidth='6'
        r='35'
        strokeDasharray='164.93361431346415 56.97787143782138'
      >
        <animateTransform
          attributeName='transform'
          type='rotate'
          repeatCount='indefinite'
          dur='1.4482758620689653s'
          values='0 50 50;360 50 50'
          keyTimes='0;1'
        ></animateTransform>
      </circle>
    </svg>
  )
}
