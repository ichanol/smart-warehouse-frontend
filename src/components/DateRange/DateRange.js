import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import { DateRange as DateRangeComponent } from 'react-date-range'
import React from 'react'
import { Wrapper } from './DateRangeStyle'

const DateRange = ({ date, setDate }) => {
  return (
    <Wrapper>
      <DateRangeComponent
        ranges={[date]}
        onChange={(item) => setDate(item.selection)}
        moveRangeOnFirstSelection={false}
        editableDateInputs
      />
    </Wrapper>
  )
}

export default DateRange
