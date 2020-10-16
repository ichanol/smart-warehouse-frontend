import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
} from './TableStyle'
import moment from 'moment'

function ProductListTable({ data, handleSort }) {

  return (
    <Table cellSpacing='0'>
      <div className='fixed-container'>
        <div className='table-title-wrapper'>
          <div className='table-title no'>
            No
            </div>
          <div
            className='table-title id'
            onClick={() => handleSort('product_id')}
          >
            Product ID
            </div>
          <div
            className='table-title name'
            onClick={() => handleSort('product_name')}
          >
            Product Name
            </div>
          <div
            className='table-title amount'
            onClick={() => handleSort('balance')}
          >
            Balance
            </div>
          <div
            className='table-title timestamp'
            onClick={() => handleSort('timestamp')}
          >
            DateTime
            </div>
          <div className='table-title description'>
            Remark
            </div>
        </div>
      </div>
      <div className='data-container'>
        {data.length > 0 ?
          data.map((value, index) => {
            return (
              <div className='table-data-wrapper' key={value.product_id}>
                <div className='table-title data-no'>
                  <span>{index + 1}</span>
                </div>
                <div className='table-title data-id'>
                  <span>{value.product_id}</span>
                </div>
                <div className='table-title data-id'>
                  <span>{value.product_name}</span>
                </div>
                <div className='table-title data-amount'>
                  <span>{value.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                </div>
                <div className='table-title data-timestamp'>
                  <span>{moment(value.timestamp).format('DD-MM-yyyy hh:mm:ss')}</span>
                </div>
                <div className='table-title data-description'>
                  <span>{value.detail}</span>
                </div>
              </div>
            )
          }) :
          <div className='empty'><h2>No data</h2></div>
        }
      </div>
    </Table>
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
