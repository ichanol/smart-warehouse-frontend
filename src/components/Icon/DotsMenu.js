import { COLORS } from '../../Constant'
import React from 'react'

const DotsMenu = ({ width = 40, fill = COLORS.gray[500] }) => (
  <svg
    viewBox='0 0 250 250'
    width={width}>
    <circle cx={125} cy={62.5} r={18} fill={fill} />
    <circle cx={125} cy={125} r={18} fill={fill} />
    <circle cx={125} cy={187.5} r={18} fill={fill} />
  </svg>
)

export default DotsMenu
