import React, { useState } from 'react'

import { Container } from './FilterButtonStyle'
import { FilterIcon } from '../Icon'

const FilterButton = ({ filter, onCheckBoxChange }) => {
  const [isDismissMenu, setIsDismissMenu] = useState(false)

  const onCheckBoxChangeHandler = (event, type) => {
    event.preventDefault()
    event.stopPropagation()
    onCheckBoxChange(type)
  }

  const onToggle = () => setIsDismissMenu(!isDismissMenu)

  return (
    <Container onChange={onToggle}>
      <div className='filter-icon-wrapper'>
        <FilterIcon width={30} />
      </div>
      <input type='checkbox' />
      <div className='filter-options'>
        <div className='options'>
          <div className='options-name'>
            <span>Status</span>
          </div>
          <div className='option-actions'>
            <div className='checkbox'>
              <label className='custom-checkbox'>
                <input
                  type='checkbox'
                  checked={filter.available}
                  onChange={(event) =>
                    onCheckBoxChangeHandler(event, 'available')
                  }
                />
                <span className='box' />
              </label>
              <span className='title'>Available</span>
            </div>
            <div className='checkbox'>
              <label className='custom-checkbox'>
                <input
                  type='checkbox'
                  checked={filter.notAvailable}
                  onChange={(event) =>
                    onCheckBoxChangeHandler(event, 'notAvailable')
                  }
                />
                <span className='box' />
              </label>
              <span className='title'>Not Available</span>
            </div>
          </div>
        </div>
      </div>
      {isDismissMenu && <div className='dismiss-menu' />}
    </Container>
  )
}

export default FilterButton
