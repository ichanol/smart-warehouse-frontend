import { OutlineButton, PrimaryButton, ToggleSwitch } from './ButtonStyle'

import { COLORS } from '../../Constant'
import React from 'react'

const SubmitButton = ({ action = () => {}, type = 'button' }) => {
  return (
    <PrimaryButton type={type} onClick={action}>
      Submit
    </PrimaryButton>
  )
}
const CancelButton = ({ action }) => {
  return (
    <OutlineButton type='button' onClick={action}>
      Cancel
    </OutlineButton>
  )
}
const RetryButton = ({ action }) => {
  return (
    <OutlineButton
      type='button'
      onClick={action}
      color={COLORS.blue[500]}
      activeColor={COLORS.blue[500]}>
      Retry
    </OutlineButton>
  )
}

const ToggleButton = ({ action, value }) => {
  return (
    <ToggleSwitch>
      <input checked={value} type='checkbox' onChange={action} />
      <span className='slider' />
    </ToggleSwitch>
  )
}

export { SubmitButton, CancelButton, RetryButton, ToggleButton }
