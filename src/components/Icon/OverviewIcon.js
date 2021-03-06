import { COLORS } from '../../Constant'
import React from 'react'

const OverviewIcon = ({ width = 40, fill = COLORS.natural.white }) => (
  <svg viewBox='-5 -5 110 110' width={width}>
    <path
      fill={fill}
      d='M78.69 23v11.62c0 1.659-1.351 3-3 3-1.66 0-3-1.341-3-3v-4.38L61.1 41.83a2.994 2.994 0 01-4.25 0L45.7 30.68 26.44 49.95c-.59.59-1.36.88-2.13.88a3 3 0 01-2.12-5.12l21.39-21.391a3 3 0 014.24 0l11.15 11.15L68.45 26h-4.39c-1.649 0-3-1.34-3-3s1.351-3 3-3h11.63c.21 0 .409.02.6.06.18.04.36.09.53.16.09.04.18.08.26.12.7.37 1.24 1 1.47 1.77.03.091.061.19.08.28 0 .021 0 .03.01.04.03.19.05.38.05.57zM36.48 60.17V77c0 1.66-1.35 3-3 3h-8.77c-1.66 0-3-1.34-3-3V60.17c0-1.65 1.34-3 3-3h8.77c1.65 0 3 1.35 3 3z'
    />
    <path
      fill={fill}
      d='M57.61 48.689V77c0 1.66-1.341 3-3 3h-8.77c-1.65 0-3-1.34-3-3V48.689c0-1.66 1.35-3 3-3h8.771a2.996 2.996 0 012.999 3zM78.75 66.18V77c0 1.66-1.34 3-3 3h-8.77c-1.66 0-3-1.34-3-3V66.18c0-1.66 1.34-3 3-3h8.77c1.66 0 3 1.34 3 3z'
    />
  </svg>
)

export default OverviewIcon
