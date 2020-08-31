import React from 'react'
import { EditBtn } from '../../components'
import PropTypes from 'prop-types'

import {
  Wrapper,
  Table,
  Top,
  Body,
  Head,
  Trow,
  Row,
} from './IETableStyle'

const ImportExportTable = ({ selected, data, select }) => {

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
            <Head>Action</Head>
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
                <Row><EditBtn selected={selected} select={select} row={(a.no)} /></Row>
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
