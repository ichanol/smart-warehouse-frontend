import React from 'react'

import './buttonStyle.css'

function CancelBtn() {

  return (
    <div className='btn'>
      <button>Cancel</button>
    </div>
  )
}

function EditBtn() {

  return (
    <div className='btn'>
      <button>Edit</button>
    </div>
  )
}

function RetryBtn() {

  return (
    <div className='btn'>
      <button>Retry</button>
    </div>
  )
}

function SubmitBtn() {

  return (
    <div className='btn'>
      <button>Submit</button>
    </div>
  )
}

export { CancelBtn, EditBtn, RetryBtn, SubmitBtn }
