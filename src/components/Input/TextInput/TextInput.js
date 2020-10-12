import { Input } from './TextInputStyle'
import React from 'react'

const TextInput = ({
  value,
  onValueChange,
  valueType,
  width,
  height,
  ...rest
}) => {
  return (
    <Input
      {...rest}
      width={width}
      height={height}
      value={value}
      onChange={(event) => onValueChange(event.target.value, valueType)}
    />
  )
}

export default TextInput
