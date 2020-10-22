import { Container, TextAreaInput } from './TextAreaStyle'

import React from 'react'

const TextArea = ({
  onValueChange,
  value,
  valueType,
  placeholder = null,
  ...rest
}) => {
  return (
    <Container>
      <TextAreaInput
        placeholder='detail'
        {...rest}
        value={value}
        onChange={(event) => onValueChange(event.target.value, valueType)}
      />
      {placeholder && <span className='placeholder'>{placeholder}</span>}
    </Container>
  )
}

export default TextArea
