import * as React from 'react'

const UserIcon = ({ width = 40, fill = 'white' }) => (
  <svg viewBox='-35 -35 175 175' width={width}>
    <path
      fill={fill}
      d='M50 57.5c14.475 0 26.25-11.775 26.25-26.25S64.475 5 50 5 23.75 16.775 23.75 31.25 35.525 57.5 50 57.5zm18.75 3.75h-37.5C16.775 61.25 5 73.025 5 87.5v5.625C5 94.161 5.839 95 6.875 95h86.25A1.874 1.874 0 0095 93.125V87.5c0-14.475-11.775-26.25-26.25-26.25z'
    />
  </svg>
)

export default UserIcon
