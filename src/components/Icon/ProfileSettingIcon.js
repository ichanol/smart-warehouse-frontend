import { COLORS } from '../../Constant'
import React from 'react'

const ProfileSettingIcon = ({ width = 40, fill = COLORS.gray[700] }) => (
  //   <svg
  //     strokeWidth={0.201}
  //     strokeLinejoin='bevel'
  //     fillRule='evenodd'
  //     overflow='visible'
  //     viewBox='15 15 65 65'
  //     width={width}
  //     fill={fill}>
  //     <path d='M39.123 38.716c0-4.899 3.976-8.875 8.876-8.875 4.899 0 8.876 3.976 8.876 8.875 0 4.9-3.977 8.875-8.876 8.875-4.9 0-8.876-3.975-8.876-8.875zm14.002 0a5.129 5.129 0 00-5.126-5.125 5.128 5.128 0 00-5.126 5.125 5.128 5.128 0 005.126 5.125 5.128 5.128 0 005.126-5.125zM32.286 66.159v-1.875c0-4.667 1.787-8.153 4.809-10.408 2.943-2.196 6.852-3.078 10.906-3.078 4.052 0 7.961.882 10.903 3.078 3.025 2.257 4.81 5.738 4.81 10.408v1.875H32.286zm24.376-9.277c-2.068-1.543-5.078-2.334-8.661-2.334-3.585 0-6.596.791-8.663 2.334-1.614 1.204-2.785 2.964-3.169 5.519H59.83c-.384-2.557-1.557-4.316-3.168-5.519z' />
  //   </svg>

  <svg viewBox='16 16 70 70' width={width} fill={fill}>
    <path
      d='M67 68.5a2 2 0 01-1.993 2H34.993a2.001 2.001 0 01-1.993-2c0-9.389 7.611-17 17-17s17 7.611 17 17zm-17-15c-8.284 0-15 6.716-15 15 0-.002 30.007 0 30.007 0-.007-8.284-6.723-15-15.007-15zm0-4c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16z'
      fillRule='nonzero'
    />
  </svg>
)

export default ProfileSettingIcon
