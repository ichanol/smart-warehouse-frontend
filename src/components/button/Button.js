import React from 'react'
import { Cancel, Retry, Submit } from './ButtonStyle'

export const SubmitButton = ({ action }) => {
  return (
    <Submit type='button' onClick={action}>
      Submit
    </Submit>
  )
}
export const CancelButton = ({ action }) => {
  return (
    <Cancel type='button' onClick={action}>
      Cancel
    </Cancel>
  )
}
export const RetryButton = ({ action }) => {
  return (
    <Retry type='button' onClick={action}>
      Retry
    </Retry>
  )
}
