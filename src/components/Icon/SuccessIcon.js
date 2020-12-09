import { COLORS } from '../../Constant'
import React from 'react'

const SuccessIcon = ({ width = 40, fill = COLORS.green[600] }) => (
  <svg viewBox='-3 -3 30 30' width={width}>
    <circle cx={12} cy={12} r={7} fill='white' />
    <path
      fill={fill}
      d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm3.71 8.71l-4 4a1 1 0 01-1.42 0l-2-2a1 1 0 011.42-1.42l1.29 1.3 3.29-3.3a1 1 0 011.42 1.42z'
    />
  </svg>
)

export default SuccessIcon
