import React from 'react'
import {
  Dropdown,
  Choice,
} from './DropdownStyle'

const DropdownFilter = ({ filterSelected, dropdownFilter }) => {
  return (
    <Dropdown
      value={filterSelected}
      onChange={dropdownFilter}
    >
      <Choice value='' disabled selected hidden>Select Column</Choice>
      <Choice value='id' selected>Product ID</Choice>
      <Choice value='name'>Product Name</Choice>
      <Choice value='amount'>Amount</Choice>
      <Choice value='time'>Time</Choice>
    </Dropdown>
  )
}

export default DropdownFilter
