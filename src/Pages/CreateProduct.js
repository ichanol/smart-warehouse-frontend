import { CancelButton, SubmitButton } from '../components/Button'
import React, { useState } from 'react'
import {
  engIsContainSpecialCharacter,
  isContainSpecialCharacter,
  isFirstCharacterSpace,
} from '../Utils/inputValidation'

import { Container } from './CreateProductStyle'
import TextArea from '../components/Input/TextArea/TextArea'
import TextInput from '../components/Input/TextInput/TextInput'
import atomState from '../Atoms/Atoms'
import { debounce } from 'lodash'
import { requestHandler } from '../Services'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'

const CreateProduct = () => {
  const history = useHistory()

  const [toastState, setToastState] = useRecoilState(atomState.toastState)

  const [inputError, setError] = useState({})
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
      const { success } = await requestHandler(
        '/products',
        true,
        productData,
        'post',
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
    } catch (error) {
      setToastState((oldState) => [
        ...oldState,
        {
          onClick: () => {},
          title: 'Failed',
          message: 'Failed to create. Try again.',
          dismiss: false,
          type: 'error',
        },
      ])
    }
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

  const checkDuplicate = async (keyword, TYPE) => {
    try {
      const { result } = await requestHandler(
        '/products',
        true,
        { validate: keyword },
        'get',
      )
      if (result?.length) {
        const tempError = { ...inputError }
        tempError[TYPE] = 'This key is not available'
        setError(tempError)
      }
    } catch (error) {
      setToastState((oldState) => [
        ...oldState,
        {
          onClick: () => {},
          title: 'Network error',
          message: 'Disconnect from the server.',
          dismiss: false,
          type: 'error',
        },
      ])
    }
  }

  const onValueChange = debounce((value, TYPE) => {
    const tempError = { ...inputError }

    if (TYPE === 'detail') {
    } else if (isFirstCharacterSpace(value)) {
      tempError[TYPE] = 'First Character should be alphabet'
    } else if (engIsContainSpecialCharacter(value) && TYPE === 'product_id') {
      tempError[TYPE] = 'a-z, A-Z, 0-9'
    } else if (isContainSpecialCharacter(value)) {
      tempError[TYPE] = 'a-z, A-Z, ก-ฮ, 0-9'
    } else {
      tempError[TYPE] = null
    }

    if (TYPE === 'product_id' && value !== '' && tempError[TYPE] === null) {
      checkDuplicate(value, TYPE)
    }

    const updateProductData = { ...productData }
    updateProductData[TYPE] = value

    setError(tempError)
    setProductData(updateProductData)
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
