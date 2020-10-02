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
      <ExportButton>
        <TextButton>Generate Report</TextButton>
      </ExportButton>
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
