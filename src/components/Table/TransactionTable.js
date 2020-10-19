import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
} from './TableStyle'
import moment from 'moment'

function TransactionTable({ data, handleSort }) {
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
            onClick={() => handleSort('amount')}
          >
            Amount
            </div>
          <div
            className='table-title timestamp'
            onClick={() => handleSort('timestamp')}
          >
            DateTime
            </div>
          <div
            className='table-title action'
            onClick={() => handleSort('action_type')}
          >
            Action Type
            </div>
          <div
            className='table-title ref'
            onClick={() => handleSort('reference_number')}
          >
            Ref Number
            </div>
          <div
            className='table-title reporter'
            onClick={() => handleSort('responsable')}
          >
            Reporter
            </div>
        </div>
      </div>
      <div className='data-container'>
        {data.length > 0 && (
          <React.Fragment>
            {data.map((value, index) => (
              <div className='table-data-wrapper' key={index}>
                <div className='table-title data-no'>
                  <span>{index + 1}</span>
                </div>
                <div className='table-title data-id'>
                  <span>{value.product_id}</span>
                </div>
                <div className='table-title data-name'>
                  <span>{value.product_name}</span>
                </div>
                <div className='table-title data-amount'>
                  <span>{value.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                </div>
                <div className='table-title data-timestamp'>
                  <span>{moment(value.timestamp).format('DD-MM-yyyy hh:mm:ss')}</span>
                </div>
                <div className='table-title data-action'>
                  <span>{value.action_type}</span>
                </div>
                <div className='table-title data-ref'>
                  <span>{value.reference_number}</span>
                </div>
                <div className='table-title data-reporter'>
                  <span>{value.firstname}</span>
                </div>
              </div>
            ))
            }
          </React.Fragment>
        )}

        {!data.length && <div className='empty'><h2>No data</h2></div>}
      </div>
    </Table>
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
