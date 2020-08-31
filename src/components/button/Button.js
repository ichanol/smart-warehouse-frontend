import React from 'react'
import {
  CancelButton,
  RetryButton,
  EditButton,
  SubmitButton,
  ExportButton,
} from './buttonStyle'

function CancelBtn() {

  return (
    <div className='btn'>
      <CancelButton>Cancel</CancelButton>
    </div>
  )
}

function EditBtn({ selected, select, row }) {

  return (
    <div className='btn'>
      <EditButton
        onClick={() => {
          select(row)
        }}
      >Edit</EditButton>
    </div>
  )
}

function RetryBtn() {

  return (
    <div className='btn'>
      <RetryButton>Retry</RetryButton>
    </div>
  )
}

function SubmitBtn() {

  return (
    <div className='btn'>
      <SubmitButton>Submit</SubmitButton>
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

export { CancelBtn, EditBtn, RetryBtn, SubmitBtn, ExportBtn }
