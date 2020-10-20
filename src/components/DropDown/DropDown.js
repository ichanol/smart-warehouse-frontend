import React, { forwardRef, useState } from 'react'

import { Container } from './DropDownStyle'
import propTypes from 'prop-types'

const DropDown = forwardRef(
  ({ selectedValue, choices, onSelect }, dropDownRef) => {
    const [display, setDisplay] = useState(false)
    return (
      <Container>
        <span className='show-item-per-page'>{selectedValue}</span>
        <input
          type='checkbox'
          checked={display}
          onChange={() => setDisplay(!display)}
        />
        <div
          className='choice-container'
          ref={(ref) => (dropDownRef.current = ref)}>
          {choices.map((value, index) => (
            <div
              className='item-per-page-choice'
              key={index}
              onClick={() => onSelect(value, index)}>
              {value}
            </div>
          ))}
        </div>
        {display && <div className='disable-dropdown' />}
      </Container>
    )
  },
)

DropDown.propTypes = {
  selectedValue: propTypes.any,
  choices: propTypes.array,
  onSelect: propTypes.func,
}
DropDown.defaultProps = {
  selectedValue: 'default',
  choices: ['default', 'choice1', 'choice2', 'choice3'],
  onSelect: () => {},
}
export default DropDown
