import React, { useState } from 'react'
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
import { Datepicker, DropdownFilter, SubmitBtn } from '../../components'

function Filter({ start, end, setStart, setEnd, submitFilter }) {
  const [filterSelected, setFilterSelected] = useState('')
  const [keyword, setKeyword] = useState('')

  const search = (e) => {
    setKeyword(e.target.value)
  }

  const dropdownFilter = (e) => {
    setFilterSelected(e.target.value)
  }

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
        <Form onSubmit={submitFilter}>
          <Block>
            <DropdownFilter
              filterSelected={filterSelected}
              dropdownFilter={dropdownFilter}
            />
            <Input onChange={search} />
          </Block>
          <Block>
            <SubmitBtn />
          </Block>
        </Form>
      </FilterBlock>
    </Wrapper>
  )
}

export default Filter
