import { COLORS } from '../../Constant'
import React from 'react'

const EditIcon = ({ width = 40, fill = COLORS.gray[700] }) => (
  <svg viewBox='-15 -12 100 100' width={width} fill={fill}>
    <path d='M20.654 49.347l15.085-3.772 30.09-30.09a4.004 4.004 0 000-5.657l-5.656-5.657a4.002 4.002 0 00-5.657 0l-30.09 30.09-3.772 15.086zm36.69-42.348l5.657 5.658-2.828 2.828-5.657-5.657L57.345 7zm-5.656 5.657l5.657 5.657L34.717 40.94l-5.657-5.657 22.628-22.628zm-24.373 26.54l3.49 3.49-4.653 1.163 1.163-4.654z' />
    <path d='M60.001 34.999h-4v28h-49V14h28v-4h-32v57h57z' />
  </svg>
)

export default EditIcon
