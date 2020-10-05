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
  Button,
} from './TableStyle'
const moment = require('moment')

function HistoryTable({ data, handleSort }) {

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
                onClick={() => handleSort('amount')}
              >
                Amount
              </Button>
            </Amount>
            <Time>
              <Button

                onClick={() => handleSort('timestamp')}
              >
                DateTime
              </Button>
            </Time>
            <Actions>
              <Button
                onClick={() => handleSort('action_type')}
              >
                Action Type
              </Button>
            </Actions>
            <Ref>
              <Button
                onClick={() => handleSort('reference_number')}
              >
                ref Number
              </Button>
            </Ref>
            <Reporter>
              <Button
                onClick={() => handleSort('responsable')}
              >
                Reporter
              </Button>
            </Reporter>
          </tr>
        </Top>
        <Body>
          {data.map((a, index) => {
            return (
              <Trow key={index}>
                <Row>{index + 1}</Row>
                <Row>{a.product_id}</Row>
                <Row>{a.product_name}</Row>
                <Row>{a.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Row>
                <Row>{moment(a.timestamp).format('DD-MM-yyyy hh:mm:ss')}</Row>
                <Row>{a.action_type}</Row>
                <Row>{a.reference_number}</Row>
                <Row>{a.responsable}</Row>
              </Trow>
            )
          })}
        </Body>
      </Table>
    </Wrapper>
  )
}

HistoryTable.defaultProps = {
  data: {},
  handleSort: () => { },
}

HistoryTable.propTypes = {
  data: PropTypes.object,
  handleSort: PropTypes.func,
}

export default HistoryTable
