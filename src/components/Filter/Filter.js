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
      <Header>
        <Head>Select Date</Head>
      </Header>
      <DateBlock>
        <Datepicker
          start={start}
          end={end}
          setStart={setStart}
          setEnd={setEnd}
        />
      </DateBlock>
      <FilterBlock>
        <Header>
          <Head>Filter</Head>
        </Header>
        <Form>
          <Block>
            <DropdownFilter filterSelected={filterSelected} dropdownFilter={dropdownFilter} />
            <Input
              value={keyword}
              onChange={search}
            />
          </Block>
          <Block>
            <ClearBtn clear={clear} />
            <SubmitBtn submitFilter={submitFilter} />
          </Block>
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
  submitFIlter: () => { },
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
  submitFIlter: PropTypes.func,
  filterSelected: PropTypes.string,
  dropfownFilter: PropTypes.func,
  search: PropTypes.func,
  clear: PropTypes.func,
}

export default Filter
