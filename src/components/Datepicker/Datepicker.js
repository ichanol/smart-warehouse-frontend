import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  DateStart,
  DateEnd,
} from './DatepickerStyle'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CrossIcon } from '../Icon'

const Datepicker = ({ date, setStart, setEnd }) => {

  const DATE_FORMAT = 'dd-MM-yyyy'

  return (
    <Wrapper>
      <DatePicker
        selected={date.start}
        onChange={dateStart => setStart(dateStart)}
        selectsStart
        startDate={date.start}
        endDate={date.end}
        maxDate={date.end || new Date()}
        placeholderText='StartDate'
        dateFormat={DATE_FORMAT}
        customInput={<DateStart />}
      />
      {date.start !== '' && <div className='clear-start' onClick={() => setStart('')}><CrossIcon /></div>}
      <DatePicker
        selected={date.end}
        onChange={dateEnd => setEnd(dateEnd)}
        selectsEnd
        startDate={date.start}
        endDate={date.end}
        minDate={date.start}
        maxDate={new Date()}
        placeholderText='EndDate'
        dateFormat={DATE_FORMAT}
        customInput={<DateEnd />}
      />
      {date.end !== '' && <div className='clear-end' onClick={() => setEnd('')}><CrossIcon /></div>}
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
