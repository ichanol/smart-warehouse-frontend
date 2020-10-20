import { CancelButton, SubmitButton } from '../components/Button'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { Container } from './EditProductStyle'
import TextArea from '../components/Input/TextArea/TextArea'
import TextInput from '../components/Input/TextInput/TextInput'
import atomState from '../Atoms/Atoms'
import { putRequest } from '../Services'
import { useRecoilValue } from 'recoil'

const EditImportExportProduct = () => {
  const { productid } = useParams()
  const history = useHistory()

  const productListState = useRecoilValue(atomState.productListState)
  const userState = useRecoilValue(atomState.userState)
  const [selectedProduct] = productListState.filter(
    (value) => value.product_id === productid,
  )
  const [editedProductData, setEditedProductData] = useState({
    company_name: selectedProduct.company_name,
    detail: selectedProduct.detail,
    location: selectedProduct.location,
    product_id: selectedProduct.product_id,
    product_name: selectedProduct.product_name,
    status: selectedProduct.status,
  })
  useEffect(() => {
    console.log(productid)
  }, [])

  const onSubmit = async () => {
    const URL = `${process.env.REACT_APP_API}/products`
    const response = await putRequest(
      URL,
      editedProductData,
      userState.accessToken,
    )
    console.log(response)
    console.log(editedProductData)
  }

  const onCancel = () => history.goBack()

  const onValueChange = (value, TYPE) => {
    const temp = { ...editedProductData }
    temp[TYPE] = value
    console.log(TYPE, temp[TYPE])
    setEditedProductData(temp)
  }

  return (
    <Container>
      <div className='header'>
        <span>Edit Product Information</span>
      </div>
      <div className='content'>
        <div className='title'>Serial number</div>
        <div className='value'>{editedProductData.product_id}</div>
        <div className='title'>Product name</div>
        <TextInput
          onValueChange={onValueChange}
          valueType='product_name'
          value={editedProductData.product_name}
        />
        <div className='title'>Company name</div>
        <TextInput
          onValueChange={onValueChange}
          valueType='company_name'
          value={editedProductData.company_name}
        />
        <div className='title'>Location</div>
        <TextInput
          onValueChange={onValueChange}
          valueType='location'
          value={editedProductData.location}
        />
        <div className='title'>Detail</div>
        <TextArea
          onValueChange={onValueChange}
          valueType='detail'
          value={editedProductData.detail}
        />
        <div className='button-wrapper'>
          <SubmitButton action={onSubmit} />
          <div className='cancel-button-wrapper'>
            <CancelButton action={onCancel} />
          </div>
        </div>
      </div>
    </Container>
  )
}
export default EditImportExportProduct

/**
 * status: 1
 */
