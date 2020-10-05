import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import atomState from '../Atoms/Atoms'

import { Container } from './EditImportExportProductStyle'
import {
  CancelButton,
  SubmitButton,
} from '../components/Button'

const EditImportExportProduct = () => {
  const { productid } = useParams()
  const history = useHistory()
  const [readProductListState, setReadProductListState] = useRecoilState(
    atomState.readProductListState,
  )
  const [selectedProduct] = readProductListState.filter(
    (value) => value.product_serial_number === productid,
  )
  const [editInformation, setEditInformation] = useState(selectedProduct)

  const goBack = () => history.goBack()

  const submitChanges = () => {
    const temp = [...readProductListState]
    const updateState = temp.map((value, key) => {
      if (
        value.product_serial_number === editInformation.product_serial_number
      ) {
        return editInformation
      } else {
        return value
      }
    })
    setReadProductListState(updateState)
    goBack()
  }
  return (
    <Container>
      <div className='header'>
        <span>Edit Product Information</span>
      </div>
      <div className='content'>
        <div className='title'>Product name</div>
        <div className='value'>{editInformation.product_name}</div>
        <div className='title'>Company name</div>
        <div className='value'>{editInformation.company_name}</div>
        <div className='title'>Location</div>
        <div className='value'>{editInformation.location}</div>
        <div className='title'>Product Serial number</div>
        <div className='value'>{editInformation.product_serial_number}</div>
        <div className='title'>Amount</div>
        <input
          id='amount'
          type='number'
          min='0'
          step='1'
          value={editInformation.amount}
          onChange={(e) => {
            const temp = { ...editInformation }
            temp.amount = parseInt(e.target.value, 10)
            setEditInformation(temp)
          }}
        />
        <div className='title'>Detail</div>
        <textarea
          id='remark'
          type='text'
          value={editInformation.detail}
          onChange={(e) => {
            const temp = { ...editInformation }
            temp.detail = e.target.value
            setEditInformation(temp)
          }}
        />
        <div className='button-wrapper'>
          <div className='cancle-button-wrapper'>
            <CancelButton action={goBack} />
          </div>
          <SubmitButton action={submitChanges} />
        </div>
      </div>
    </Container>
  )
}
export default EditImportExportProduct
