import { COLORS } from '../../Constant'
import React from 'react'

const ChevronDownIcone = ({
  width = 18,
  fill = COLORS.gray[400],
  isActive = true,
  activeType = 'type',
  type = 'type',
}) => {
  return (
    <svg
      viewBox='13 10 75 75'
      width={width}
      transform={`rotate(${isActive && activeType === type ? 0 : 180})`}>
      <path
        d='M32.475 37.525a3.5 3.5 0 10-4.95 4.95l20 20a3.5 3.5 0 004.95 0l20-20a3.5 3.5 0 10-4.95-4.95L49.99 55.06 32.475 37.525z'
        fill={`${activeType === type ? COLORS.natural.black : fill}`}
        fillRule='evenodd'
      />
    </svg>
  )
}

export default ChevronDownIcone
