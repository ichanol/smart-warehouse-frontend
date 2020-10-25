import { COLORS } from '../../Constant'
import React from 'react'

const CancelIcon = ({
  width = 40,
  fill = COLORS.gray[600],
  stroke = 'none',
}) => {
  return (
    <svg viewBox='-20 -20 105 105' width={width}>
      <path
        stroke={stroke}
        strokeWidth={5}
        fill={fill}
        d='M5.209 1.745c-.883 0-1.778.343-2.45 1.015-1.342 1.342-1.342 3.558 0 4.899L27.1 32 2.759 56.341c-1.342 1.342-1.342 3.558 0 4.899.65.65 1.558 1.015 2.45 1.015s1.799-.364 2.45-1.015L32 36.9l24.341 24.34a3.512 3.512 0 002.45 1.015 3.43 3.43 0 002.45-1.015c1.342-1.342 1.342-3.558 0-4.899L36.901 32l24.34-24.341c1.342-1.342 1.342-3.558 0-4.899s-3.558-1.342-4.899 0L32.001 27.101 7.66 2.76a3.473 3.473 0 00-2.45-1.015z'
      />
    </svg>
  )
}

export default CancelIcon
