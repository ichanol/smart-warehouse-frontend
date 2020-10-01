import React from 'react'
import PropTypes from 'prop-types'
import {
  CancelButton,
  RetryButton,
  EditButton,
  SubmitButton,
  ExportButton,
  DeleteButton,
  ClearButton,
  FilterButton,
  TextButton,
} from './buttonStyle'

function CancelBtn() {
  return (
    <div className='btn'>
      <CancelButton
        type='button'
      >
        Cancel
      </CancelButton>
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
      >
        Edit
        </EditButton>
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
        }}
      >
        Retry
        </RetryButton>
    </div>
  )
}

function SubmitBtn({ submitFilter }) {
  return (
    <div className='btn'>
      <SubmitButton
        type='submit'
        onClick={submitFilter}
      >
        <TextButton>Submit</TextButton>
      </SubmitButton>
    </div>
  )
}

function ExportBtn() {
  return (
    <div className='btn'>
      <ExportButton>
        <TextButton>Generate Report</TextButton>
      </ExportButton>
    </div>
  )
}

function DeleteBtn() {
  return (
    <div className='btn'>
      <DeleteButton>
        Delete
      </DeleteButton>
    </div>
  )
}

function ClearBtn({ clear }) {
  return (
    <div className='btn'>
      <ClearButton
        type='button'
        onClick={() => clear()}
      >
        <TextButton className='clear'>Clear</TextButton>
      </ClearButton>
    </div>
  )
}

function FilterBtn({ toggle }) {
  return (
    <div>
      <FilterButton
        type='button'
        onClick={toggle}
      >
        Filter
      </FilterButton>
    </div>
  )
}

EditBtn.defaultProps = {
  select: () => { },
  row: 0,
}

EditBtn.propTypes = {
  select: PropTypes.func,
  row: PropTypes.number,
}

RetryBtn.defaultProps = {
  retry: () => { },
}

RetryBtn.propTypes = {
  retry: PropTypes.func,
}

SubmitBtn.defaultProps = {
  submitFilter: () => { },
}

SubmitBtn.propTypes = {
  submitFilter: PropTypes.func,
}

ClearBtn.defaultProps = {
  clear: () => { },
}

ClearBtn.propTypes = {
  clear: PropTypes.func,
}

FilterBtn.defaultProps = {
  toggle: () => { },
}

FilterBtn.propTypes = {
  toggle: PropTypes.func,
}

export { CancelBtn, EditBtn, RetryBtn, SubmitBtn, ExportBtn, DeleteBtn, ClearBtn, FilterBtn }
