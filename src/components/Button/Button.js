import { OutlineButton, PrimaryButton, ToggleSwitch } from './ButtonStyle'

import { COLORS } from '../../Constant'
import React from 'react'

const SubmitButton = ({ action = () => {}, type = 'button' }) => (
  <PrimaryButton type={type} onClick={action}>
    Submit
  </PrimaryButton>
)

const CancelButton = ({ action }) => (
  <OutlineButton type='button' onClick={action}>
    Cancel
  </OutlineButton>
)

const RetryButton = ({ action }) => (
  <OutlineButton
    type='button'
    onClick={action}
    color={COLORS.blue[500]}
    activeColor={COLORS.blue[500]}>
    Retry
  </OutlineButton>
)

const ToggleButton = ({ action, value, ...rest }) => (
  <ToggleSwitch>
    <input checked={value} type='checkbox' onChange={action} {...rest} />
    <span className='slider' />
  </ToggleSwitch>
)

export { SubmitButton, CancelButton, RetryButton, ToggleButton }
