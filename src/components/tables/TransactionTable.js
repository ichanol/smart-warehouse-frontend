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
  Time,
  Actions,
  Ref,
  Reporter,
  Body,
  Trow,
  Row,
} from './TableStyle'
const moment = require('moment')

function TransactionTable({ data, handleSort }) {

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
              onClick={() => handleSort('amount')}
            >
              Amount
            </Amount>
            <Time
              onClick={() => handleSort('timestamp')}
            >
              DateTime
            </Time>
            <Actions
              onClick={() => handleSort('action_type')}
            >
              Action Type
            </Actions>
            <Ref
              onClick={() => handleSort('reference_number')}
            >
              ref Number
            </Ref>
            <Reporter
              onClick={() => handleSort('responsable')}
            >
              Reporter
            </Reporter>
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
                  <Row>{value.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Row>
                  <Row>{moment(value.timestamp).format('DD-MM-yyyy hh:mm:ss')}</Row>
                  <Row>{value.action_type}</Row>
                  <Row>{value.reference_number}</Row>
                  <Row>{value.firstname}</Row>
                </Trow>
              )
            }) :
            <Row colSpan='8'><h2>No data</h2></Row>
          }
        </Body>
      </Table>
    </Wrapper>
  )
}

TransactionTable.defaultProps = {
  data: {},
  handleSort: () => { },
}

TransactionTable.propTypes = {
  data: PropTypes.object,
  handleSort: PropTypes.func,
}

export default TransactionTable
