import { Container, Input } from './TextInputStyle'
import React, { forwardRef } from 'react'

const TextInput = forwardRef(
  (
    {
      value,
      onValueChange,
      valueType,
      width,
      height,
      placeholder = null,
      ...rest
    },
    inputRef,
  ) => {
    return (
      <Container>
        <Input
          ref={inputRef}
          {...rest}
          width={width}
          height={height}
          value={value}
          onChange={(event) => onValueChange(event.target.value, valueType)}
        />
        {placeholder && <span className='placeholder'>{placeholder}</span>}
      </Container>
    )
  },
)

export default TextInput
