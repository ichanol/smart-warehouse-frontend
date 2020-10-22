import { Container, Input } from './TextInputStyle'

import React from 'react'

const TextInput = ({
  value,
  onValueChange,
  valueType,
  width,
  height,
  placeholder = null,
  ...rest
}) => {
  return (
    <Container>
      <Input
        {...rest}
        width={width}
        height={height}
        value={value}
        onChange={(event) => onValueChange(event.target.value, valueType)}
      />
      {placeholder && <span className='placeholder'>{placeholder}</span>}
    </Container>
  )
}

export default TextInput
