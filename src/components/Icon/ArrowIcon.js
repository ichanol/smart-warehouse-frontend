import { COLORS } from '../../Constant'
import React from 'react'

const ArrowIcon = ({ width = 25, height = 25, fill = COLORS.natural.black }) => (
  <svg
    width={width}
    height={height}
    fill={fill}
  >
    <path
      d='M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z'
      fillRule='evenodd'
    />
  </svg>
)

export default ArrowIcon
