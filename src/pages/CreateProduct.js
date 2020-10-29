import { CancelButton, SubmitButton } from '../components/Button'
import React, { useState } from 'react'
import { getRequest, postRequest } from '../Services'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Container } from './CreateProductStyle'
import TextArea from '../components/Input/TextArea/TextArea'
import TextInput from '../components/Input/TextInput/TextInput'
import atomState from '../Atoms/Atoms'
import { debounce } from 'lodash'
import { useHistory } from 'react-router-dom'

const CreateProduct = () => {
  const history = useHistory()
  const userState = useRecoilValue(atomState.userState)
  const [inputError, setError] = useState({})
  const [toastState, setToastState] = useRecoilState(atomState.toastState)

  const [productData, setProductData] = useState({
    company_name: '',
    detail: '',
    location: '',
    product_id: '',
    product_name: '',
    status: true,
  })

  const onSubmit = async () => {
    try {
      const URL = `${process.env.REACT_APP_API}/products`
      const { success } = await postRequest(
        URL,
        productData,
        userState.accessToken,
      )
      if (success) {
        setToastState([
          ...toastState,
          {
            onClick: () => {},
            title: 'Success',
            message: 'New product has been created',
            dismiss: false,
            type: 'success',
          },
        ])
        history.goBack()
      }
    } catch (error) {}
  }

  const onCancel = () => history.goBack()

  const validateInputForm = (event) => {
    event.preventDefault()
    let isError = 0
    for (const [key, value] of Object.entries(inputError)) {
      if (value) {
        isError = isError + 1
      }
    }
    if (isError) {
      //containerRef.current.scrollTop = inputRef.current.offsetParent.offsetTop
    } else {
      onSubmit()
    }
  }

  const checkDuplicate = async (keyword) => {
    try {
      const URL = `${process.env.REACT_APP_API}/products?validate=${keyword}`
      const { result } = await getRequest(URL, userState.accessToken)
      if (result.length) {
        setError((oldState) => ({
          ...oldState,
          product_id: 'This key is not available',
        }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onValueChange = debounce((value, TYPE) => {
    const tempError = { ...inputError }
    if (/^\s.*$/.exec(value)) {
      tempError[TYPE] = 'First Character can not be a space'
    } else if (
      /[!@#$%^&*(),.?":;'/\\{}|<>_+\-~ก-๙]/.exec(value) &&
      TYPE === 'product_id'
    ) {
      tempError[TYPE] = 'a-z, A-Z, 0-9'
    } else if (
      /[!@#$%^&*,?":;'/\\{}|<>_+\-~]/.exec(value) &&
      TYPE !== 'detail'
    ) {
      tempError[TYPE] = 'a-z, A-Z, ก-ฮ, 0-9'
    } else {
      tempError[TYPE] = null
    }
    if (TYPE === 'product_id') {
      checkDuplicate(value)
    }
    console.log(value)
    setError(tempError)
    const temp = { ...productData }
    temp[TYPE] = value
    setProductData(temp)
    return true
  }, 300)

  return (
    <Container>
      <div className='header'>
        <span>Create New Product</span>
      </div>
      <form onSubmit={validateInputForm}>
        <div className='content'>
          <TextInput
            required
            placeholder='Serial number'
            onValueChange={onValueChange}
            valueType='product_id'
            maxLength='10'
            error={inputError.product_id}
          />
          <TextInput
            required
            placeholder='Product name'
            onValueChange={onValueChange}
            valueType='product_name'
            maxLength='30'
            error={inputError.product_name}
          />
          <TextInput
            required
            placeholder='Company name'
            onValueChange={onValueChange}
            valueType='company_name'
            maxLength='40'
            error={inputError.company_name}
          />
          <TextInput
            required
            placeholder='Location'
            onValueChange={onValueChange}
            valueType='location'
            maxLength='30'
            error={inputError.location}
          />
          <TextArea
            placeholder='Detail'
            onValueChange={onValueChange}
            valueType='detail'
          />
          <div className='button-wrapper'>
            <SubmitButton type='submit' />
            <div className='cancel-button-wrapper'>
              <CancelButton action={onCancel} />
            </div>
          </div>
        </div>
      </form>
    </Container>
  )
}
export default CreateProduct
