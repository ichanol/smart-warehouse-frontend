import { COLORS } from '../../Constant'
import React from 'react'

const SearchIcon = ({ width = 40, fill = COLORS.gray[600] }) => {
  return (
    <svg
      viewBox='-10 -10 125 125'
      fillRule='evenodd'
      clipRule='evenodd'
      strokeLinejoin='round'
      strokeMiterlimit={2}
      width={width}>
      <path
        fill={fill}
        stroke={fill}
        strokeWidth={2}
        d='M62.706 66.949a28.59 28.59 0 01-7.561 4.67c-10.91 4.539-24.373 1.974-32.87-6.225-9.278-8.952-11.93-24.06-6.072-35.666 5.021-9.943 15.692-16.673 27.047-16.781h.393c13.999.134 27.201 10.933 29.793 24.919 1.607 8.671-1.076 17.864-6.565 24.763l19.304 19.303c2.065 2.177-.97 7.349-4.243 4.243L62.706 66.949zM43.288 18.947c-11.157.106-21.592 8.571-23.843 19.562-2.252 10.995 4.128 23.135 14.471 27.512 11.411 4.83 26.159-.644 31.615-11.959 6.947-14.41-3.802-34.715-21.609-35.111a44.665 44.665 0 00-.634-.004z'
      />
    </svg>
  )
}

export default SearchIcon
