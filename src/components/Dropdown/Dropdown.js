import React from 'react'
import PropTypes from 'prop-types'
import { ArrowIcon } from '../Icon'
import { DropDownContainer } from './DropdownStyle'
import { Dropdown } from '../../Constant'

const ActionsDropdown = ({ handleSelect, selected, open, handleToggle }) => {
  return (
    <DropDownContainer open={open}>
      <div
        className='dropdown-title'
        onClick={handleToggle}
      >
        <p>{selected === '' ? 'Select Actions' : selected}</p>
        <div className='arrow'>
          <ArrowIcon />
        </div>
      </div>

      {open && (
        <div className='dropdown-items'>
          {Dropdown.map((value, key) => {
            return (
              <ul
                key={key}
                onClick={() => handleSelect(value.value)}
              >
                <li>{value.value}</li>
              </ul>
            )
          })}
        </div>
      )
      }

    </DropDownContainer>
  )
}

ActionsDropdown.defaultProps = {
  selected: '',
  handleSelect: () => { },
  open: false,
  handleToggle: () => { },
}

ActionsDropdown.propTypes = {
  selected: PropTypes.string,
  handleSelect: PropTypes.func,
  open: PropTypes.bool,
  handleToggle: PropTypes.func,
}

export default ActionsDropdown
