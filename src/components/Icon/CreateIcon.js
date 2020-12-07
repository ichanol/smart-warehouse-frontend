import { COLORS } from '../../Constant'
import React from 'react'

const CreateIcon = ({ width = 40, fill = COLORS.gray[700] }) => {
  return (
    <svg
      viewBox='-120 -100 1060 1060'
      fillRule='evenodd'
      clipRule='evenodd'
      shapeRendering='geometricPrecision'
      textRendering='geometricPrecision'
      imageRendering='optimizeQuality'
      width={width}
      fill={fill}>
      <path
        d='M169 129h324l4 4 121 121 4 3v489H157V129h12zm234 215v108h108v28H403v108h-28V480H267v-28h108V344h28zm193-69H475V154H182v567h414V275zm-95-25h77l-77-78v78z'
        fillRule='nonzero'
      />
    </svg>
  )
}

export default CreateIcon
