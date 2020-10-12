import React from 'react'
import PropTypes from 'prop-types'
import {
  Dropdown,
  Choice,
} from './DropdownStyle'

const DropdownFilter = ({ filterSelected, dropdownFilter }) => {
  return (
    <Dropdown
      defaultValue=''
      value={filterSelected}
      onChange={dropdownFilter}
    >
      <Choice value='' disabled selected hidden>Select Column</Choice>
      {/* <Choice value='productid' selected>Product ID</Choice> */}
      <Choice value='responsable'>Reporter</Choice>
      <Choice value='ref'>Reference_number</Choice>
      <Choice value='action'>Action type</Choice>
      <Choice value='amount'>Amount</Choice>
    </Dropdown>
  )
}

const ActionsDropdown = ({ selected, handleSelect }) => {
  return (
    <Dropdown
      defaultValue=''
      value={selected}
      onChange={handleSelect}
    >
      <Choice value='' disabled selected hidden>Select Action</Choice>
      <Choice value='import'>Import</Choice>
      <Choice value='export'>Export</Choice>
      <Choice value='expired'>Expired</Choice>
      <Choice value='damaged'>Damaged</Choice>
    </Dropdown>
  )
}

DropdownFilter.defaultProps = {
  filterSelected: '',
  dropdownFilter: () => { },
}

DropdownFilter.propTypes = {
  filterSelected: PropTypes.string,
  dropdownFilter: PropTypes.func,
}

ActionsDropdown.defaultProps = {
  selected: '',
  handleSelect: () => { },
}

ActionsDropdown.propTypes = {
  selected: PropTypes.string,
  handleSelect: PropTypes.func,
}

export { DropdownFilter, ActionsDropdown }
