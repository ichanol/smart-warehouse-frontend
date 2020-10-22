import { CancelButton, SubmitButton } from '../components/Button'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { Container } from './EditImportExportProductStyle'
import TextArea from '../components/Input/TextArea/TextArea'
import TextInput from '../components/Input/TextInput/TextInput'
import atomState from '../Atoms/Atoms'
import { useRecoilState } from 'recoil'

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

  const updatedProductList = () => {
    const index = readProductListState.findIndex(
      (value) =>
        value.product_serial_number === editInformation.product_serial_number,
    )
    const newReadProductlistState = [...readProductListState]
    newReadProductlistState[index] = editInformation
    return newReadProductlistState
  }

  const submitChanges = () => {
    setReadProductListState(updatedProductList())
    goBack()
  }

  const inputHandler = (value, type) => {
    if (type === 'amount') {
      value = parseInt(value, 10)
    }
    const temp = { ...editInformation }
    temp[type] = value
    setEditInformation(temp)
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
        <TextInput
          width={100}
          type='number'
          min='0'
          value={editInformation.amount}
          valueType='amount'
          onValueChange={inputHandler}
          placeholder='Amount'
        />
        <TextArea
          type='text'
          value={editInformation.detail}
          valueType='detail'
          onValueChange={inputHandler}
          placeholder='Product detail'
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
