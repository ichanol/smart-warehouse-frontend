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

DropdownFilter.defaultProps = {
  filterSelected: '',
  dropdownFilter: () => { },
}

DropdownFilter.propTypes = {
  filterSelected: PropTypes.string,
  dropdownFilter: PropTypes.func,
}

export { DropdownFilter }
