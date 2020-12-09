import { COLORS } from '../../Constant'
import React from 'react'

const DocumentIcon = ({ width = 40, fill = COLORS.gray[700] }) => (
  <svg viewBox='-16 -18 135 135' width={width} fill={fill}>
    <path d='M84.268 25.732l-20-20A2.5 2.5 0 0062.5 5h-45A2.5 2.5 0 0015 7.5v85a2.5 2.5 0 002.5 2.5h65a2.5 2.5 0 002.5-2.5v-65c0-.663-.264-1.299-.732-1.768zM65 13.535L76.465 25H65V13.535zM80 90H20V10h40v17.5a2.5 2.5 0 002.5 2.5H80v60z' />
    <path d='M30 27.5h22.5a2.5 2.5 0 100-5H30a2.5 2.5 0 100 5zM27.5 35a2.5 2.5 0 002.5 2.5h37.5a2.5 2.5 0 100-5H30a2.5 2.5 0 00-2.5 2.5zM67.5 42.5H30a2.5 2.5 0 100 5h37.5a2.5 2.5 0 100-5zM67.5 52.5H30a2.5 2.5 0 100 5h37.5a2.5 2.5 0 100-5zM67.5 62.5H30a2.5 2.5 0 100 5h37.5a2.5 2.5 0 100-5zM67.5 72.5H30a2.5 2.5 0 100 5h37.5a2.5 2.5 0 100-5z' />
  </svg>
)

export default DocumentIcon
