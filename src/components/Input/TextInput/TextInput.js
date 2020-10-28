import { Container, Input } from './TextInputStyle'
import React, { forwardRef } from 'react'

const TextInput = forwardRef(
  (
    {
      onValueChange,
      valueType,
      width,
      height,
      placeholder = null,
      error = null,
      ...rest
    },
    inputRef,
  ) => {
    return (
      <Container>
        <Input
          id='custom-text-input'
          ref={inputRef}
          {...rest}
          width={width}
          height={height}
          onChange={(event) => onValueChange(event.target.value, valueType)}
        />
        {placeholder && (
          <label htmlFor='custom-text-input' className='placeholder'>
            {placeholder}
          </label>
        )}
        {error && <span className='input-error-suggestion'>{error}</span>}
      </Container>
    )
  },
)

export default TextInput
