import React, { useEffect, useState } from 'react'
import {
  Wrapper,
  Table,
  Top,
  No,
  Id,
  Name,
  Amount,
  Company,
  Time,
  Description,
  Body,
  Trow,
  Row,
} from './TableStyle'

function InventoryTable({ data }) {

  return (
    <Wrapper>
      <Table cellSpacing='0'>
        <Top>
          <tr>
            <No>No</No>
            <Id>Product ID</Id>
            <Name>Product Name</Name>
            <Amount>Balance</Amount>
            <Description>Description</Description>
          </tr>
        </Top>
        <Body>
          {data.map((a, index) => {
            return (
              <Trow key={index}>
                <Row>{a.id}</Row>
                <Row>{a.product_id}</Row>
                <Row>{a.product_name}</Row>
                <Row>{a.balance}</Row>
                <Row>{a.time}</Row>
              </Trow>
            )
          })}
        </Body>
      </Table>
    </Wrapper>
  )
}

export default InventoryTable
