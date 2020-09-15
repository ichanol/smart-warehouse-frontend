import React from 'react'
import {
  Wrapper,
  Table,
  Top,
  No,
  Id,
  Name,
  Amount,
  Time,
  Body,
  Trow,
  Row,
} from './TableStyle'

function HistoryTable({ data }) {

  return (
    <Wrapper>
      <Table cellSpacing='0'>
        <Top>
          <tr>
            <No>No</No>
            <Id>Product ID</Id>
            <Name>Product Name</Name>
            <Amount>Amount</Amount>
            <Time>Time</Time>
          </tr>
        </Top>
        <Body>
          {data.map((a, index) => {
            return (
              <Trow key={index}>
                <Row>{a.id}</Row>
                <Row>{a.product_id}</Row>
                <Row>{a.product_name}</Row>
                <Row>{a.amount}</Row>
                <Row>{a.time}</Row>
              </Trow>
            )
          })}
        </Body>
      </Table>
    </Wrapper>
  )
}

export default HistoryTable
