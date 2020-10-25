import { COLORS } from '../../Constant'
import React from 'react'

const WarningIcon = ({ width = 40, fill = COLORS.yellow[500] }) => {
  return (
    <svg viewBox='-12 -12 125 125' width={width}>
      <circle cx={50} cy={50} r={23} fill='white' />
      <path
        fill={fill}
        d='M88 75L58.69 16.36A9.63 9.63 0 0050 11a9.66 9.66 0 00-8.67 5.35L12 75a9.7 9.7 0 008.67 14h58.64A9.69 9.69 0 0088 75zm-34-4a4 4 0 01-8 0V52a4 4 0 018 0zm-4-28a4 4 0 114-4 4 4 0 01-4 4z'
      />
    </svg>
  )
}

export default WarningIcon
