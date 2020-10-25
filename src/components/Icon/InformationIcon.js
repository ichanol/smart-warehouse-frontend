import { COLORS } from '../../Constant'
import React from 'react'

const InformationIcon = ({ width = 40, fill = COLORS.blue[600] }) => {
  return (
    <svg viewBox='-100 -100 680 680' width={width}>
      <circle cx={200} cy={175} r={170} fill='white' />
      <path
        fill={fill}
        d='M225 0C100.74 0 0 100.74 0 225s100.74 225 225 225 225-100.74 225-225S349.26 0 225 0zm-26 322.12v-103a26 26 0 0152 0v103a26 26 0 01-52 0zm26-157.37a31.25 31.25 0 1131.25-31.25A31.25 31.25 0 01225 164.75z'
      />
    </svg>
  )
}

export default InformationIcon
