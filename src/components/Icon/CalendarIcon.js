import { COLORS } from '../../Constant'
import React from 'react'

const CalendarIcon = ({ width = 30, fill = COLORS.gray[600] }) => (
  <svg viewBox='-125 -125 1280 1280' width={width} fill={fill}>
    <path
      fill='none'
      stroke={fill}
      strokeWidth={50}
      strokeMiterlimit={10}
      d='M1002.143 875.049c0 37.003-29.997 67-67 67h-846c-37.003 0-67-29.997-67-67v-642c0-37.003 29.997-67 67-67h846c37.003 0 67 29.997 67 67v642zm-785-811v186m590-186v186m-502.75 157.5h-122v122h122v-122zm266 122h-122v-122h122v122zm271.5 0h-122v-122h122v122zm-539 120h-122v122h122v-122zm266 122h-122v-122h122v122zm271.5 0h-122v-122h122v122z'
    />
  </svg>
)

export default CalendarIcon
