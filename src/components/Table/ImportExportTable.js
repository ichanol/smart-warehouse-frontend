import React from 'react'
import { useRecoilValue } from 'recoil'
import atomState from '../../Atoms/Atoms'
import { Table } from './ImportExportTableStyle'
import { Edit, Delete } from '../Icon'

const ImportExportProduct = (props) => {
  const readProductListState = useRecoilValue(atomState.readProductListState)

  return (
    <Table>
      <div className='fixed-container'>
        <div className='table-title-wrapper'>
          <div className='table-title' id='no'>
            No.
          </div>
          <div className='table-title' id='id'>
            Serial No.
          </div>
          <div className='table-title' id='name'>
            Product name
          </div>
          <div className='table-title' id='company'>
            Company
          </div>
          <div className='table-title' id='amount'>
            Amount
          </div>
          <div className='table-title' id='description'>
            Description
          </div>
          <div className='table-title' id='action'>
            Actions
          </div>
        </div>
      </div>

      <div className='data-container'>
        {readProductListState
          ? readProductListState.map((value, key) => {
              return (
                <div className='table-data-wrapper' key={key}>
                  <div className='table-title' id='data-no'>
                    <span>{key + 1}</span>
                  </div>
                  <div className='table-title' id='data-id'>
                    <span>{value.product_serial_number}</span>
                  </div>
                  <div className='table-title' id='data-name'>
                    <span>{value.product_name}</span>
                  </div>
                  <div className='table-title' id='data-company'>
                    <span>
                      {value.company_name}
                      {value.company_name}
                      {value.company_name}
                    </span>
                  </div>
                  <div className='table-title' id='data-amount'>
                    <span>{value.amount.toLocaleString()}</span>
                  </div>
                  <div className='table-title' id='data-description'>
                    <span>{value.detail}</span>
                  </div>
                  <div className='table-title' id='data-action'>
                    <div onClick={() => props.editFN(value)}>
                      <Edit width={35} />
                    </div>
                    <div
                      onClick={() => {
                        props.deleteFN(value)
                      }}>
                      <Delete width={35} />
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
