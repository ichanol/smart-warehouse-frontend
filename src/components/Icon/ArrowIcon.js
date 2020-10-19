import { COLORS } from '../../Constant'
import React from 'react'

const ArrowIcon = ({ width = 18, height = 18, fill = COLORS.natural.black }) => (
  <svg
    width={width}
    height={height}
    fill={fill}
    viewBox='0 0 24 24'
  >
    <path
      d='M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z'
      fillRule='evenodd'
    />
  </svg>
)

export default ArrowIcon
