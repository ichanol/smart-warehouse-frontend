import { COLORS } from '../../Constant'
import React from 'react'

const FileIcon = ({ width = 45, fill = 300 }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 100 100'
    width={width}
    fill={COLORS.gray[fill]}>
    <path d='M82 96H14c-1.104 0-2-.9-2-2V24.328c0-.492.18-.964.508-1.332l20-22.328C32.888.244 33.428 0 34 0h48c1.1 0 2 .896 2 2v92c0 1.1-.9 2-2 2zm-66-4h64V4H34.896L16 25.092V92z' />
    <path d='M34 28H16a2 2 0 010-4h16V4a2 2 0 014 0v22a2 2 0 01-2 2z' />
  </svg>
)

export default FileIcon
