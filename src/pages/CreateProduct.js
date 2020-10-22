import { CancelButton, SubmitButton } from '../components/Button'
import React, { useState } from 'react'

import { Container } from './CreateProductStyle'
import TextArea from '../components/Input/TextArea/TextArea'
import TextInput from '../components/Input/TextInput/TextInput'
import atomState from '../Atoms/Atoms'
import { postRequest } from '../Services'
import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

const EditImportExportProduct = () => {
  const history = useHistory()
  const userState = useRecoilValue(atomState.userState)
  const [productData, setProductData] = useState({
    company_name: '',
    detail: '',
    location: '',
    product_id: '',
    product_name: '',
    status: true,
  })

  const onSubmit = async () => {
    const URL = `${process.env.REACT_APP_API}/products`
    const response = await postRequest(URL, productData, userState.accessToken)
    console.log(response)
  }

  const onCancel = () => history.goBack()

  const onValueChange = (value, TYPE) => {
    const temp = { ...productData }
    temp[TYPE] = value
    console.log(TYPE, temp[TYPE])
    setProductData(temp)
  }

  return (
    <Container>
      <div className='header'>
        <span>Create New Product</span>
      </div>
      <div className='content'>
        <TextInput
          placeholder='Serial number'
          onValueChange={onValueChange}
          valueType='product_id'
        />
        <TextInput
          placeholder='Product name'
          onValueChange={onValueChange}
          valueType='product_name'
        />
        <TextInput
          placeholder='Company name'
          onValueChange={onValueChange}
          valueType='company_name'
        />
        <TextInput
          placeholder='Location'
          onValueChange={onValueChange}
          valueType='location'
        />
        <TextArea
          placeholder='Detail'
          onValueChange={onValueChange}
          valueType='detail'
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
