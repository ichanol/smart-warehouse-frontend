import React, { useRef, useState } from 'react'

import { Container } from './DropDownStyle'
import clsx from 'clsx'
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
  defaultValue,
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
      {placeholder && <span className='placeholder-text'>{placeholder?.toString().toLowerCase()}</span>}
      <div className='choice-placeholder'>
        <span className='show-item-per-page'>
          {selectedValue?.toString().toLowerCase()}
        </span>
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
            <span
              className={clsx(
                'item-per-page-choice',
                value[field] === selectedValue && 'selected',
                value[field] === defaultValue && 'default',
              )}
              key={index}
              onClick={() => onSelectChoice(index)}>
              {value[field]?.toString().toLowerCase()}
            </span>
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
  defaultValue: propTypes.string,
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
  defaultValue: '',
}
export default DropDown
