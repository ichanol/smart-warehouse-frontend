import React from 'react'
import {
  CancelButton,
  RetryButton,
  EditButton,
  SubmitButton,
  ExportButton,
  DeleteButton,
} from './buttonStyle'

function CancelBtn() {

  return (
    <div className='btn'>
      <CancelButton type='button'>Cancel</CancelButton>
    </div>
  )
}

function EditBtn({ select, row }) {

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

function RetryBtn({ retry }) {

  return (
    <div className='btn'>
      <RetryButton
        type='button'
        onClick={() => {
          retry()
        }}>
        Retry</RetryButton>
    </div>
  )
}

function SubmitBtn() {

  return (
    <div className='btn'>
      <SubmitButton
        type='submit'
      >Submit</SubmitButton>
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

function DeleteBtn() {



  return (
    <div className='btn'>
      <DeleteButton>Delete</DeleteButton>
    </div>
  )
}

export { CancelBtn, EditBtn, RetryBtn, SubmitBtn, ExportBtn, DeleteBtn }
