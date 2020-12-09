import { COLORS } from '../../Constant'
import React from 'react'

const ErrorIcon = ({ width = 40, fill = COLORS.red[600] }) => (
  <svg viewBox='-20 -20 140 140' width={width}>
    <switch>
      <g>
        <circle cx={50} cy={50} r={27} fill='white' />
        <path
          fill={fill}
          d='M50 2.5C23.8 2.5 2.5 23.8 2.5 50S23.8 97.5 50 97.5 97.5 76.2 97.5 50 76.2 2.5 50 2.5zm19.9 58.6c2.4 2.4 2.4 6.3 0 8.8-1.2 1.2-2.8 1.8-4.4 1.8-1.6 0-3.2-.6-4.4-1.8L50 58.8 38.9 69.9c-1.2 1.2-2.8 1.8-4.4 1.8s-3.2-.6-4.4-1.8c-2.4-2.4-2.4-6.3 0-8.8L41.2 50 30.1 38.9c-2.4-2.4-2.4-6.3 0-8.8 2.4-2.4 6.3-2.4 8.8 0L50 41.2l11.1-11.1c2.4-2.4 6.3-2.4 8.8 0 2.4 2.4 2.4 6.3 0 8.8L58.8 50l11.1 11.1z'
        />
      </g>
    </switch>
  </svg>
)

export default ErrorIcon
