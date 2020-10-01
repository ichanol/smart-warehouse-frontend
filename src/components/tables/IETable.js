import React from 'react'
import { EditBtn, DeleteBtn } from '../../components'
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
  Time,
  Description,
  Actions,
  Trow,
  Row,
  Action,
} from './TableStyle'

const ImportExportTable = ({ data, select }) => {

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
            <Time>Time</Time>
            <Description>Description</Description>
            <Actions>Action</Actions>
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
                <Row>{a.company_name}</Row>
                <Row>{a.time}</Row>
                <Row>{a.detail}</Row>
                <Row><Action><EditBtn select={select} row={(a.no)} /><DeleteBtn /></Action></Row>
              </Trow>
            )
          })}
        </Body>
      </Table>
    </Wrapper>
  )
}

ImportExportTable.defaultProps = {
  data: {},
  select: () => { },
}

ImportExportTable.propTypes = {
  data: PropTypes.object,
  select: PropTypes.func,
}

export default ImportExportTable
