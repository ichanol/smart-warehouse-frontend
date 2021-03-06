import { COLORS } from '../../Constant'
import React from 'react'

const MapIcon = ({ width = 40, fill = COLORS.natural.white }) => (
  <svg viewBox='-24 -22 110 110' width={width}>
    <path
      fill={fill}
      d='M54 21a22.12 22.12 0 00-44 0 22.37 22.37 0 00-.16 2.62A25.82 25.82 0 0012.35 35a53.13 53.13 0 002.57 4.67l13.94 21.06a3.63 3.63 0 006.24 0l14-21.05c.92-1.54 1.8-3.1 2.57-4.7a25.56 25.56 0 002.5-11.35A22.06 22.06 0 0054 21zM38.79 34.35a12.44 12.44 0 01-13.58 0 12.85 12.85 0 01-6-10.73v-.12a12.75 12.75 0 0125.49 0v.13a12.86 12.86 0 01-5.91 10.72z'
    />
  </svg>
)

export default MapIcon
