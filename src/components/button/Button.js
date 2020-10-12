import { OutlineButton, PrimaryButton } from './ButtonStyle'

import { COLORS } from '../../Constant'
import React from 'react'

const SubmitButton = ({ action }) => {
  return (
    <PrimaryButton type='button' onClick={action}>
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

export { SubmitButton, CancelButton, RetryButton }
