import React from 'react'

const ModalButton = ({ value, action, ...rest }) => (
  <button type='button' onClick={action} {...rest}>
    {value}
  </button>
)

export default ModalButton
