import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  Table,
  Top,
  No,
  Id,
  Name,
  Amount,
  Description,
  Body,
  Trow,
  Row,
  Time,
} from './TableStyle'
const moment = require('moment')

function ProductListTable({ data, handleSort }) {

  return (
    <Wrapper>
      <Table cellSpacing='0'>
        <Top>
          <tr>
            <No>
              No
            </No>
            <Id
              onClick={() => handleSort('product_id')}
            >
              Product ID
            </Id>
            <Name
              onClick={() => handleSort('product_name')}
            >
              Product Name
            </Name>
            <Amount
              onClick={() => handleSort('balance')}
            >
              Balance
            </Amount>
            <Time
              onClick={() => handleSort('timestamp')}
            >
              DateTime
            </Time>
            <Description>
              Remark
            </Description>
          </tr>
        </Top>
        <Body>
          {data.length > 0 ?
            data.map((value, index) => {
              return (
                <Trow key={index}>
                  <Row>{index + 1}</Row>
                  <Row>{value.product_id}</Row>
                  <Row>{value.product_name}</Row>
                  <Row>{value.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Row>
                  <Row>{moment(value.timestamp).format('DD-MM-yyyy hh:mm:ss')}</Row>
                  <Row>{value.detail}</Row>
                </Trow>
              )
            }) :
            <Row colSpan='6'><h2>No data</h2></Row>
          }

        </Body>
      </Table>
    </Wrapper>
  )
}

ProductListTable.defaultProps = {
  data: {},
  handleSort: () => { },
}

ProductListTable.propTypes = {
  data: PropTypes.object,
  handleSort: PropTypes.func,
}

export default ProductListTable
