import { COLORS } from '../../Constant'
import React from 'react'

const DeleteIcon = ({ width = 40, fill = COLORS.natural.red }) => (
  <svg viewBox='-4 -4 42 42' width={width}>
    <path
      d='M26 6h-5l-1.429-2h-7.142L11 6H6v2h20zM8 25.429A2.628 2.628 0 0010.667 28h10.666A2.628 2.628 0 0024 25.429V10H8z'
      fillRule='evenodd'
      fill={fill}
    />
  </svg>
)

export default DeleteIcon
