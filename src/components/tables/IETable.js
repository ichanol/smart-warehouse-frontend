import React from 'react'
import { Wrapper, Table, Top, Body, Head, Trow, Row } from './IETableStyle'

const ImportExportTable = ({ data, select }) => {

  return (
    <Wrapper>
      <Table cellSpacing='0'>
        <Top>
          <tr>
            <Head>No.</Head>
            <Head>Product_ID</Head>
            <Head>Product_Name</Head>
            <Head>Amount</Head>
            <Head>Time</Head>
          </tr>
        </Top>
        <Body>
          {data.map((a, index) => {
            return <Trow key={index} onClick={() => select(a.no)}>
              <Row>{a.no}</Row>
              <Row>{a.productid}</Row>
              <Row>{a.productname}</Row>
              <Row>{a.amount}</Row>
              <Row>{a.time}</Row>
            </Trow>
          })}
        </Body>
      </Table>
    </Wrapper>
  )
}

export default ImportExportTable
