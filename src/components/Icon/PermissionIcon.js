import * as React from 'react'

const PermissionIcon = ({ width = 40, fill = 'white' }) => (
  <svg viewBox='-3 -3 54 54' width={width}>
    <path
      fill={fill}
      d='M29.5 9.28a8.5 8.5 0 00-7.06 13.24L10.67 34.29l2.83 2.83 2-2L18.39 38l6.48-6.48L22 28.63l3.41-3.41A8.5 8.5 0 1029.5 9.28zm0 14a5.5 5.5 0 115.5-5.5 5.5 5.5 0 01-5.5 5.5z'
    />
    <path d='M0 0h48v48H0V0z' fill='none' />
  </svg>
)

export default PermissionIcon
