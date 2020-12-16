import React, { useRef, useState } from 'react'

import { Container } from './DropDownStyle'
import propTypes from 'prop-types'

const DropDown = ({
  selectedValue,
  choices,
  onSelect,
  width,
  isCenter,
  placeholder,
  fullWidth,
  field,
}) => {
  const [display, setDisplay] = useState(false)
  const dropDownRef = useRef()
  const onSelectChoice = (index) => {
    dropDownRef.current.scrollTop = 40 * (index - 1)
    onSelect(index)
  }
  return (
    <Container
      multiplier={choices.length}
      containerWidth={width}
      isCenter={isCenter}
      fullWidth={fullWidth}>
      {placeholder && <span>{placeholder}</span>}
      <div className='choice-placeholder'>
        <span className='show-item-per-page'>{selectedValue}</span>
        <input
          type='checkbox'
          checked={display}
          onChange={() => setDisplay(!display)}
        />
        <div
          className='choice-container'
          ref={(ref) => {
            dropDownRef.current = ref
          }}>
          {choices.map((value, index) => (
            <div
              className='item-per-page-choice'
              key={index}
              onClick={() => onSelectChoice(index)}>
              {value[field]}
            </div>
          ))}
        </div>
        {display && <div className='disable-dropdown' />}
      </div>
    </Container>
  )
}

DropDown.propTypes = {
  selectedValue: propTypes.any,
  choices: propTypes.array,
  onSelect: propTypes.func,
  field: propTypes.string,
  placeholder: propTypes.any,
  width: propTypes.any,
  isCenter: propTypes.bool,
  fullWidth: propTypes.bool,
}
DropDown.defaultProps = {
  selectedValue: 'default',
  choices: [
    { name: 'default' },
    { name: 'choice1' },
    { name: 'choice2' },
    { name: 'choice3' },
  ],
  onSelect: () => {},
  field: 'name',
  placeholder: 'Show:',
  width: '80px',
  isCenter: true,
  fullWidth: true,
}
export default DropDown
