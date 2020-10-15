import React from 'react'
import PropTypes from 'prop-types'
import { DropdownLists } from '../../Constant'
import { ArrowIcon } from '../Icon'
import {
  Dropdown,
} from './DropdownStyle'

const ActionsDropdown = ({ handleSelect, selected, open, handleToggle }) => {
  return (
    <Dropdown open={open}>
      <div
        className='dd-title'
        onClick={handleToggle}
      >
        <p>{selected === '' ? 'Select Actions' : selected}</p>
        <div className='arrow'>
          <ArrowIcon />
        </div>
      </div>

      {open && (
        <div className='dd-items'>
          {DropdownLists.map((value, key) => {
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

    </Dropdown>
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
