import React from 'react'
import { EditBtn, DeleteBtn } from '..'
import PropTypes from 'prop-types'

import {
  Wrapper,
  Table,
  Top,
  Body,
  No,
  Id,
  Name,
  Amount,
  Company,
  Description,
  Actions,
  Trow,
  Row,
  Action,
} from './TableStyle'

const ImportExportTable = ({ data, editFN, deleteFN }) => {
  console.log('table', data)
  return (
    <Wrapper>
      <Table cellSpacing='0'>
        <Top>
          <tr>
            <No>No.</No>
            <Id>Product_ID</Id>
            <Name>Product_Name</Name>
            <Amount>Amount</Amount>
            <Company>Company</Company>
            <Description>Description</Description>
            <Actions>Action</Actions>
          </tr>
        </Top>
        <Body>
          {data.map((value, key) => {
            return (
              <Trow key={key}>
                <Row>{key + 1}</Row>
                <Row>{value.product_serial_number}</Row>
                <Row>{value.product_name}</Row>
                <Row>{value.amount}</Row>
                <Row>{value.company_name}</Row>
                <Row>{value.detail}</Row>
                <Row>
                  <Action>
                    <EditBtn action={editFN} rowID={key} />
                    <DeleteBtn action={deleteFN} rowID={key} />
                  </Action>
                </Row>
              </Trow>
            )
          })}
        </Body>
      </Table>
    </Wrapper>
  )
}

ImportExportTable.defaultProps = {
  data: [],
  select: () => { },
}

ImportExportTable.propTypes = {
  data: PropTypes.array,
  select: PropTypes.func,
}

export default ImportExportTable
