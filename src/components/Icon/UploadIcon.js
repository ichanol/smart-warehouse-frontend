import { COLORS } from '../../Constant'
import React from 'react'

const UploadIcon = ({ width = 20, fill = COLORS.gray[700] }) => {
  return (
    <svg viewBox='0 0 64 80' width={width} fill={fill}>
      <g data-name='Layer 44'>
        <path d='M17.39 24.15L30.5 11v35.76a1.5 1.5 0 003 0V11l13.11 13.15a1.49 1.49 0 001.06.44A1.51 1.51 0 0048.73 22L33.06 6.36a1.5 1.5 0 00-2.12 0L15.27 22a1.5 1.5 0 002.12 2.15zM55.67 57.31a1.5 1.5 0 00.2-.73v-6.41a1.5 1.5 0 00-3 0v4.91H11.13v-4.91a1.5 1.5 0 00-3 0v6.41a1.52 1.52 0 00.23.79l.06.1a1.49 1.49 0 001.2.6c.32 0 44.77.07 45.06 0a1.36 1.36 0 00.91-.6.41.41 0 00.08-.16z' />
      </g>
    </svg>
  )
}

export default UploadIcon
