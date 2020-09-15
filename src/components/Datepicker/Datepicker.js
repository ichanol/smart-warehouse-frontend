import React from 'react'
import {
  Wrapper,
  DateStart,
  DateEnd,
} from './DatepickerStyle'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Datepicker = ({ start, end, setStart, setEnd }) => {

  return (
    <Wrapper>
      <DatePicker
        selected={start}
        onChange={date => setStart(date)}
        selectsStart
        showMonthDropdown
        startDate={start}
        endDate={end}
        maxDate={new Date()}
        dateFormat='dd-MM-yyyy'
        customInput={<DateStart />}
      />
      <DatePicker
        selected={end}
        onChange={date => setEnd(date)}
        selectsEnd
        startDate={start}
        endDate={end}
        minDate={start}
        maxDate={new Date()}
        dateFormat='dd-MM-yyyy'
        customInput={<DateEnd />}
      />
    </Wrapper>
  )
}

export default Datepicker
