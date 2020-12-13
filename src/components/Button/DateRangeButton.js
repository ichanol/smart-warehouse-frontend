import React, { useState } from 'react'

import { CalendarIcon } from '../Icon'
import { Container } from './DateRangeButtonStyle'
import { DateRange } from '../DateRange'

const DateRangeButton = ({ setDate, date }) => {
  const [isDismissMenu, setIsDismissMenu] = useState(false)
  return (
    <Container>
      <CalendarIcon />
      <input
        type='checkbox'
        onChange={() => setIsDismissMenu(!isDismissMenu)}
      />
      <div className='date-range-container'>
        <DateRange setDate={setDate} date={date} />
      </div>
      {isDismissMenu && <div className='dismiss-menu' />}
    </Container>
  )
}

export default DateRangeButton
