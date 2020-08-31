import React from 'react'
import {
  Wrapper,
  Table,
  Top,
  Head,
  Body,
  Trow,
  Row,
} from './HistorytableStyle'
import { data } from '../../components'

function HistoryTable() {

  return (
    <Wrapper>
      <Table cellSpacing='0'>
        <Top>
          <tr>
            <Head>No</Head>
            <Head>Product ID</Head>
            <Head>Product Name</Head>
            <Head>Amount</Head>
            <Head>Time</Head>
          </tr>
        </Top>
        <Body>
          {data.map((a, index) => {
            return (
              <Trow key={index}>
                <Row>{a.no}</Row>
                <Row>{a.productid}</Row>
                <Row>{a.productname}</Row>
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
