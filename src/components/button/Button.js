import React from 'react'

import Button from './buttonStyle'

function CancelBtn() {

  return (
    <div className='btn'>
      <Button>Cancel</Button>
    </div>
  )
}

function EditBtn() {

  return (
    <div className='btn'>
      <Button>Edit</Button>
    </div>
  )
}

function RetryBtn() {

  return (
    <div className='btn'>
      <Button>Retry</Button>
    </div>
  )
}

function SubmitBtn() {

  return (
    <div className='btn'>
      <Button>Submit</Button>
    </div>
  )
}

export { CancelBtn, EditBtn, RetryBtn, SubmitBtn }
