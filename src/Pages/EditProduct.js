import { CancelButton, SubmitButton } from '../components/Button'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Container } from './EditProductStyle'
import TextArea from '../components/Input/TextArea/TextArea'
import TextInput from '../components/Input/TextInput/TextInput'
import atomState from '../Atoms/Atoms'
import { debounce } from 'lodash'
import { request } from '../Services'

const CreateProduct = () => {
  const history = useHistory()
  const userState = useRecoilValue(atomState.userState)
  const [inputError, setError] = useState({})
  const [toastState, setToastState] = useRecoilState(atomState.toastState)

  const { productid } = useParams()

  const productListState = useRecoilValue(atomState.productListState)
  const [selectedProduct] = productListState.filter(
    (value) => value.product_id === productid,
  )
  const [editedProductData, setEditedProductData] = useState({
    company_name: selectedProduct?.company_name,
    detail: selectedProduct?.detail,
    location: selectedProduct?.location,
    product_id: selectedProduct?.product_id,
    product_name: selectedProduct?.product_name,
    status: selectedProduct?.status,
  })

  useEffect(() => {
    if (!productid || !selectedProduct) {
      history.push('/product-management')
    }
  }, [])

  const onSubmit = async () => {
    try {
      const { success } = await request(
        '/products',
        editedProductData,
        userState.accessToken,
        'put',
      )
      if (success) {
        setToastState([
          ...toastState,
          {
            onClick: () => {},
            title: 'Success',
            message: 'Save changes',
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
    console.log(value)
    setError(tempError)
    const temp = { ...editedProductData }
    temp[TYPE] = value
    setEditedProductData(temp)
    return true
  }, 300)

  return (
    <Container>
      <div className='header'>
        <span>Edit Product Information</span>
      </div>
      <form onSubmit={validateInputForm}>
        <div className='content'>
          <TextInput
            disabled
            required
            placeholder='Serial number'
            onValueChange={onValueChange}
            valueType='product_id'
            maxLength='10'
            error={inputError.product_id}
            defaultValue={editedProductData.product_id}
          />
          <TextInput
            required
            placeholder='Product name'
            onValueChange={onValueChange}
            valueType='product_name'
            maxLength='30'
            error={inputError.product_name}
            defaultValue={editedProductData.product_name}
          />
          <TextInput
            required
            placeholder='Company name'
            onValueChange={onValueChange}
            valueType='company_name'
            maxLength='40'
            error={inputError.company_name}
            defaultValue={editedProductData.company_name}
          />
          <TextInput
            required
            placeholder='Location'
            onValueChange={onValueChange}
            valueType='location'
            maxLength='30'
            error={inputError.location}
            defaultValue={editedProductData.location}
          />
          <TextArea
            placeholder='Detail'
            onValueChange={onValueChange}
            valueType='detail'
            defaultValue={editedProductData.detail}
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
