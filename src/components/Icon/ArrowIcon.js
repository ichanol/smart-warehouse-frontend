import { COLORS } from '../../Constant'
import React from 'react'

const ArrowIcon = ({ width = 30, fill = COLORS.natural.black }) => (
  <svg viewBox='0 0 100 100' width={width} fill={fill}>
    <path d='M50 2.5A47.5 47.5 0 002.5 50 47.5 47.5 0 0050 97.5 47.5 47.5 0 0097.5 50 47.5 47.5 0 0050 2.5zM50 75l-7.09-7.09 13.35-13.35H25v-9.12h31.26L42.91 32.09 50 25l25 25z' />
  </svg>
)

export default ArrowIcon
