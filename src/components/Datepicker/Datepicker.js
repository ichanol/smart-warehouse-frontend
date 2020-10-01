import React from 'react'
import PropTypes from 'prop-types'
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
        startDate={start}
        endDate={end}
        maxDate={end || new Date()}
        placeholderText='StartDate'
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
        placeholderText='EndDate'
        dateFormat='dd-MM-yyyy'
        customInput={<DateEnd />}
      />
    </Wrapper>
  )
}

Datepicker.defaultProps = {
  start: {},
  end: {},
  setStart: () => { },
  setEnd: () => { },
}

Datepicker.propTypes = {
  start: PropTypes.object,
  end: PropTypes.object,
  setStart: PropTypes.func,
  setEnd: PropTypes.func,
}

export default Datepicker
