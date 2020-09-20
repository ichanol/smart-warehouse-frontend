import React from 'react'
import {
  CancelButton,
  RetryButton,
  EditButton,
  SubmitButton,
  ExportButton,
  DeleteButton,
} from './buttonStyle'

function CancelBtn({ action }) {
  return (
    <div className='btn'>
      <CancelButton type='button' onClick={() => action()}>
        Cancel
      </CancelButton>
    </div>
  )
}

function EditBtn({ action, rowID }) {
  return (
    <div className='btn'>
      <EditButton onClick={() => action(rowID)}>Edit</EditButton>
    </div>
  )
}

function RetryBtn({ retry }) {
  return (
    <div className='btn'>
      <RetryButton
        type='button'
        onClick={() => {
          retry()
        }}>
        Retry
      </RetryButton>
    </div>
  )
}

function SubmitBtn({ action }) {
  return (
    <div className='btn'>
      <SubmitButton type='submit' onClick={(event) => action(event)}>
        Submit
      </SubmitButton>
    </div>
  )
}

function ExportBtn() {
  return (
    <div className='btn'>
      <ExportButton>Export</ExportButton>
    </div>
  )
}

function DeleteBtn({ action, rowID }) {
  return (
    <div className='btn'>
      <DeleteButton onClick={() => action(rowID)}>Delete</DeleteButton>
    </div>
  )
}

export { CancelBtn, EditBtn, RetryBtn, SubmitBtn, ExportBtn, DeleteBtn }
