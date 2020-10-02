import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  Header,
  Head,
  DateBlock,
  FilterBlock,
  Form,
  Input,
  Block,
} from './FilterStyle'
import { Datepicker, DropdownFilter, SubmitBtn, ClearBtn } from '../../components'

function Filter({
  start,
  end,
  setStart,
  setEnd,
  keyword,
  submitFilter,
  filterSelected,
  dropdownFilter,
  search,
  clear,
}) {

  return (
    <Wrapper>
      <Block>
        <DropdownFilter filterSelected={filterSelected} dropdownFilter={dropdownFilter} />
        <Input
          value={keyword}
          onChange={search}
        />
      </Block>
      <DateBlock>
        <Datepicker
          start={start}
          end={end}
          setStart={setStart}
          setEnd={setEnd}
        />
      </DateBlock>
      <FilterBlock>
        <Form>
          <ClearBtn clear={clear} />
          <SubmitBtn submitFilter={submitFilter} />
        </Form>
      </FilterBlock>
    </Wrapper >
  )
}

Filter.defaultProps = {
  start: {},
  end: {},
  setStart: () => { },
  setEnd: () => { },
  keyword: '',
  submitFilter: () => { },
  filterSelected: '',
  dropfownFilter: () => { },
  search: () => { },
  clear: () => { },
}

Filter.propTypes = {
  start: PropTypes.object,
  end: PropTypes.object,
  setStart: PropTypes.func,
  setEnd: PropTypes.func,
  keyword: PropTypes.string,
  submitFilter: PropTypes.func,
  filterSelected: PropTypes.string,
  dropfownFilter: PropTypes.func,
  search: PropTypes.func,
  clear: PropTypes.func,
}

export default Filter
