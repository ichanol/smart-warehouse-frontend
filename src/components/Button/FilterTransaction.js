import React, { useState } from 'react'

import { Container } from './FilterTransactionStyle'
import { FilterIcon } from '../Icon'
import { Slider } from '../Slider'

const FilterTrasaction = ({
  filter,
  onCheckBoxChange = () => {},
  setMaxAmount = () => {},
  setMinAmount = () => {},
  setMinMaxAmountOnSlider = () => {},
  setMaxBalance = () => {},
  setMinBalance = () => {},
  setMinMaxBalanceOnSlider = () => {},
}) => {
  const [isDismissMenu, setIsDismissMenu] = useState(false)

  const onCheckBoxChangeHandler = (event, group, value) => {
    event.preventDefault()
    event.stopPropagation()
    onCheckBoxChange(group, value)
  }

  const stopPropagation = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const onToggle = () => setIsDismissMenu(!isDismissMenu)

  return (
    <Container>
      <div className='filter-icon-wrapper'>
        <FilterIcon width={30} />
      </div>
      <input type='checkbox' onChange={onToggle} />
      <div className='filter-options'>
        <div className='options-row'>
          <div className='options'>
            <div className='options-name'>
              <span>Status</span>
            </div>
            <div className='option-actions'>
              <div className='checkbox'>
                <label className='custom-checkbox'>
                  <input
                    type='checkbox'
                    checked={filter.status.available}
                    onChange={(event) =>
                      onCheckBoxChangeHandler(event, 'status', 'available')
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
                    checked={filter.status.notAvailable}
                    onChange={(event) =>
                      onCheckBoxChangeHandler(event, 'status', 'notAvailable')
                    }
                  />
                  <span className='box' />
                </label>
                <span className='title'>Not Available</span>
              </div>
            </div>
          </div>
          <div className='options'>
            <div className='options-name'>
              <span>Action</span>
            </div>
            <div className='option-actions-row'>
              <div className='checkbox'>
                <label className='custom-checkbox'>
                  <input
                    type='checkbox'
                    checked={filter.action.import}
                    onChange={(event) =>
                      onCheckBoxChangeHandler(event, 'action', 'import')
                    }
                  />
                  <span className='box' />
                </label>
                <span className='title'>Import</span>
              </div>
              <div className='checkbox'>
                <label className='custom-checkbox'>
                  <input
                    type='checkbox'
                    checked={filter.action.export}
                    onChange={(event) =>
                      onCheckBoxChangeHandler(event, 'action', 'export')
                    }
                  />
                  <span className='box' />
                </label>
                <span className='title'>Export</span>
              </div>
              <div className='checkbox'>
                <label className='custom-checkbox'>
                  <input
                    type='checkbox'
                    checked={filter.action.expired}
                    onChange={(event) =>
                      onCheckBoxChangeHandler(event, 'action', 'expired')
                    }
                  />
                  <span className='box' />
                </label>
                <span className='title'>Expired</span>
              </div>
              <div className='checkbox'>
                <label className='custom-checkbox'>
                  <input
                    type='checkbox'
                    checked={filter.action.damaged}
                    onChange={(event) =>
                      onCheckBoxChangeHandler(event, 'action', 'damaged')
                    }
                  />
                  <span className='box' />
                </label>
                <span className='title'>Damaged</span>
              </div>
            </div>
          </div>
        </div>
        <div className='options-row'>
          <div className='range-slider'>
            <div className='options-name'>
              <span>Amount</span>
            </div>
            <div
              className='slider-wrapper'
              onClick={(event) => stopPropagation(event)}>
              <Slider
                setMax={setMaxAmount}
                setMin={setMinAmount}
                setMinMax={setMinMaxAmountOnSlider}
                width={220}
                color='blue'
              />
            </div>
          </div>
          <div className='range-slider'>
            <div className='options-name'>
              <span>Balance</span>
            </div>
            <div
              className='slider-wrapper'
              onClick={(event) => stopPropagation(event)}>
              <Slider
                setMax={setMaxBalance}
                setMin={setMinBalance}
                setMinMax={setMinMaxBalanceOnSlider}
                width={220}
                color='blue'
              />
            </div>
          </div>
        </div>
      </div>
      {isDismissMenu && <div className='dismiss-menu' />}
    </Container>
  )
}

export default FilterTrasaction
