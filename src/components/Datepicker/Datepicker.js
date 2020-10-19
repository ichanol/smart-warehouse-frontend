import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  DateStart,
  DateEnd,
} from './DatepickerStyle'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CrossIcon, CalendarIcon } from '../Icon'

const Datepicker = ({ date, setStart, setEnd }) => {

  const DATE_FORMAT = 'dd-MM-yyyy'

  return (
    <Wrapper>
      <DatePicker
        selected={date.start}
        onChange={setStart}
        selectsStart
        startDate={date.start}
        endDate={date.end}
        maxDate={date.end || new Date()}
        placeholderText='StartDate'
        dateFormat={DATE_FORMAT}
        customInput={<DateStart />}
      />
      {date.start && <div className='clear-start' onClick={() => setStart('')}><CrossIcon /></div>}
      <div className='calendar-start-icon'>
        <CalendarIcon />
      </div>
      <DatePicker
        selected={date.end}
        onChange={setEnd}
        selectsEnd
        startDate={date.start}
        endDate={date.end}
        minDate={date.start}
        maxDate={new Date()}
        placeholderText='EndDate'
        dateFormat={DATE_FORMAT}
        customInput={<DateEnd />}
      />
      {date.end && <div className='clear-end' onClick={() => setEnd('')}><CrossIcon /></div>}
      <div className='calendar-end-icon'>
        <CalendarIcon />
      </div>
    </Wrapper>
  )
}

Datepicker.defaultProps = {
  date: {},
  setStart: () => { },
  setEnd: () => { },
}

Datepicker.propTypes = {
  date: PropTypes.object,
  setStart: PropTypes.func,
  setEnd: PropTypes.func,
}

export default Datepicker
