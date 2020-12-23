import { COLORS } from '../../Constant'
import React from 'react'

const DownloadIcon = ({ width = 40, fill = COLORS.natural.black }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='-12 -12 125 125'
    width={width}
    fill={fill}>
    <path d='M50 23a2 2 0 00-2 2v34.042L33.544 44.586a2 2 0 10-2.828 2.828l17.87 17.87c.39.391.902.586 1.414.586s1.024-.195 1.414-.586l17.87-17.87a2 2 0 10-2.828-2.828L52 59.042V25a2 2 0 00-2-2z' />
    <path d='M24 58a2 2 0 00-2 2v15a2 2 0 002 2h52a2 2 0 002-2V61a2 2 0 00-4 0v12H26V60a2 2 0 00-2-2z' />
  </svg>
)

export default DownloadIcon
