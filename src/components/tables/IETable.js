import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper, Table, Top, Body, Head, Trow, Row } from './IETableStyle'

const ImportExportTable = ({ data, select }) => {
  return (
    <Wrapper>
      <Table cellSpacing='0'>
        <Top>
          <tr>
            <Head>No.</Head>
            <Head>Serial Number</Head>
            <Head>Name</Head>
            <Head>Company</Head>
            <Head>Amount</Head>
          </tr>
        </Top>
        <Body>
          {data.map((a, index) => {
            return (
              <Trow key={index} onClick={() => select(a.no)}>
                <Row>{index + 1}</Row>
                <Row>{a.productSerialNumber}</Row>
                <Row>{a.product_name}</Row>
                <Row>{a.company_name}</Row>
                <Row>{a.amount}</Row>
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
  select: () => {},
}

ImportExportTable.propTypes = {
  data: PropTypes.object,
  select: PropTypes.func,
}

export default ImportExportTable
