import { CancelButton, SubmitButton, TextArea, TextInput } from '../components'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { Container } from './EditImportExportProductStyle'
import atomState from '../Atoms/Atoms'
import { useRecoilState } from 'recoil'

const EditImportExportProduct = () => {
  const { productid } = useParams()
  const history = useHistory()
  const [readProductListState, setReadProductListState] = useRecoilState(
    atomState.readProductListState,
  )
  const [selectedProduct] = readProductListState.filter(
    (value) => value.product_id === productid,
  )
  const [editInformation, setEditInformation] = useState(selectedProduct)

  const goBack = () => history.goBack()

  const updatedProductList = () => {
    const index = readProductListState.findIndex(
      (value) => value.product_id === editInformation.product_id,
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
        <TextInput
          value={editInformation.product_id}
          placeholder='Serial number'
          disabled
        />
        <TextInput
          value={editInformation.product_name}
          placeholder='Product name'
          disabled
        />
        <TextInput
          value={editInformation.company_name}
          placeholder='Company name'
          disabled
        />
        <TextInput
          value={editInformation.location_name}
          placeholder='Location'
          disabled
        />
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
          valueType='product_detail'
          onValueChange={inputHandler}
          placeholder='Remark'
          border
        />
        <div className='button-wrapper'>
          <SubmitButton action={submitChanges} />
          <div className='cancle-button-wrapper'>
            <CancelButton action={goBack} />
          </div>
        </div>
      </div>
    </Container>
  )
}
export default EditImportExportProduct
