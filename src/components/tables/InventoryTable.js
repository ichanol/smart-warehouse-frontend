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
  Button,
  Time,
} from './TableStyle'
const moment = require('moment')

function InventoryTable({ data, handleSort }) {

  return (
    <Wrapper>
      <Table cellSpacing='0'>
        <Top>
          <tr>
            <No>
              <Button>
                No
              </Button>
            </No>
            <Id>
              <Button
                onClick={() => handleSort('product_id')}
              >
                Product ID
              </Button>
            </Id>
            <Name>
              <Button
                onClick={() => handleSort('product_name')}
              >
                Product Name
              </Button>
            </Name>
            <Amount>
              <Button
                onClick={() => handleSort('balance')}
              >
                Balance
              </Button>
            </Amount>
            <Time>
              <Button
                onClick={() => handleSort('timestamp')}
              >
                DateTime
              </Button>
            </Time>
            <Description>
              <Button>
                Remark
              </Button>
            </Description>
          </tr>
        </Top>
        <Body>
          {data.map((a, index) => {
            return (
              <Trow key={index}>
                <Row>{index + 1}</Row>
                <Row>{a.product_id}</Row>
                <Row>{a.product_name}</Row>
                <Row>{a.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Row>
                <Row>{moment(a.timestamp).format('DD-MM-yyyy hh:mm:ss')}</Row>
                <Row>{a.detail}</Row>
              </Trow>
            )
          })}
        </Body>
      </Table>
    </Wrapper>
  )
}

InventoryTable.defaultProps = {
  data: {},
  handleSort: () => { },
}

InventoryTable.propTypes = {
  data: PropTypes.object,
  handleSort: PropTypes.func,
}

export default InventoryTable
