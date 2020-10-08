import { DeleteIcon, EditIcon } from '../Icon'

import React from 'react'
import { Table } from './ImportExportTableStyle'
import atomState from '../../Atoms/Atoms'
import { useRecoilValue } from 'recoil'

const ImportExportProduct = (props) => {
  const readProductListState = useRecoilValue(atomState.readProductListState)

  return (
    <Table>
      <div className='fixed-container'>
        <div className='table-title-wrapper'>
          <div className='table-title no'>
            No.
          </div>
          <div className='table-title id'>
            Serial No.
          </div>
          <div className='table-title name'>
            Product name
          </div>
          <div className='table-title company'>
            Company
          </div>
          <div className='table-title amount'>
            Amount
          </div>
          <div className='table-title description'>
            Description
          </div>
          <div className='table-title action'>
            Actions
          </div>
        </div>
      </div>

      <div className='data-container'>
        {readProductListState
          ? readProductListState.map((value, index) => {
              return (
                <div className='table-data-wrapper' key={index}>
                  <div className='table-title data-no'>
                    <span>{index + 1}</span>
                  </div>
                  <div className='table-title data-id'>
                    <span>{value.product_serial_number}</span>
                  </div>
                  <div className='table-title data-name'>
                    <span>{value.product_name}</span>
                  </div>
                  <div className='table-title data-company'>
                    <span>
                      {value.company_name}
                      {value.company_name}
                      {value.company_name}
                    </span>
                  </div>
                  <div className='table-title data-amount'>
                    <span>{value.amount.toLocaleString()}</span>
                  </div>
                  <div className='table-title data-description'>
                    <span>{value.detail}</span>
                  </div>
                  <div className='table-title data-action'>
                    <div onClick={() => props.editFN(value)}>
                      <EditIcon />
                    </div>
                    <div onClick={() => props.deleteFN(value)}>
                      <DeleteIcon />
                    </div>
                  </div>
                </div>
              )
            })
          : null}
      </div>
    </Table>
  )
}

export default ImportExportProduct
