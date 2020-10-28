import { Container, TextAreaInput } from './TextAreaStyle'
import React, { forwardRef } from 'react'

const TextArea = forwardRef(
  (
    { onValueChange, value, valueType, placeholder = null, ...rest },
    inputRef,
  ) => {
    return (
      <Container>
        <TextAreaInput
          ref={inputRef}
          id='custom-text-area'
          placeholder='detail'
          {...rest}
          onChange={(event) => onValueChange(event.target.value, valueType)}
        />
        {placeholder && (
          <label htmlFor='custom-text-area' className='placeholder'>
            {placeholder}
          </label>
        )}
      </Container>
    )
  },
)

export default TextArea
