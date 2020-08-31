import React from 'react'
import { Wrapper, Header, Head, DateBlock, DateStart, DateEnd, FilterBlock, Form, Dropdown, Choice, ButtonBlock } from './FilterStyle'
import { SubmitBtn } from '../../components'

function Filter() {

  return (
    <Wrapper>
      <Header>
        <Head>Select Date</Head>
      </Header>
      <DateBlock>
        <DateStart type='date' />
        <DateEnd type='date' />
      </DateBlock>
      <FilterBlock>
        <Header>
          <Head>Filter</Head>
        </Header>
        <Form>
          <Dropdown>
            <Choice value='id' selected>Product ID</Choice>
            <Choice value='name'>Product Name</Choice>
            <Choice value='amount'>Amount</Choice>
            <Choice value='time'>Time</Choice>
          </Dropdown>
        </Form>
      </FilterBlock>
      <ButtonBlock>
        <SubmitBtn />
      </ButtonBlock>
    </Wrapper>
  )
}

export default Filter
