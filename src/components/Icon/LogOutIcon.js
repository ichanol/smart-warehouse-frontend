import { COLORS } from '../../Constant'
import React from 'react'

const LogOutIcon = ({ width = 40, fill = COLORS.gray[700] }) => (
  <svg viewBox='-8 -6 60 60' width={width} fill={fill}>
    <path d='M29 34a1 1 0 00-1 1v5H8V8h20v5a1 1 0 002 0V7a1 1 0 00-1-1H7a1 1 0 00-1 1v34a1 1 0 001 1h22a1 1 0 001-1v-6a1 1 0 00-1-1z' />
    <path d='M41.64 23.23l-6-5a1 1 0 10-1.28 1.54L38.24 23H21a1 1 0 000 2h17.24l-3.88 3.23a1 1 0 00-.13 1.41A1 1 0 0035 30a1 1 0 00.64-.23l6-5a1 1 0 000-1.54z' />
  </svg>
)

export default LogOutIcon
