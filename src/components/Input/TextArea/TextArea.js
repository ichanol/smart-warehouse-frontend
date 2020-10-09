import React from 'react'
import { TextAreaInput } from './TextAreaStyle'

const TextArea = ({ onValueChange, value, valueType, ...rest }) => {
  return (
    <TextAreaInput
      {...rest}
      value={value}
      onChange={(event) => onValueChange(event.target.value, valueType)}
    />
  )
}

export default TextArea
