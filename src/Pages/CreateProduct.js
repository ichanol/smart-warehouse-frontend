import {
  CancelButton,
  DropDown,
  SubmitButton,
  TextArea,
  TextInput,
} from '../components'
import React, { useEffect, useState } from 'react'
import {
  engIsContainSpecialCharacter,
  isContainSpecialCharacter,
  isFirstCharacterSpace,
} from '../Utils/inputValidation'

import { Container } from './CreateProductStyle'
import atomState from '../Atoms/Atoms'
import { debounce } from 'lodash'
import { requestHandler } from '../Services'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'

const CreateProduct = () => {
  const history = useHistory()

  const [toastState, setToastState] = useRecoilState(atomState.toastState)

  const [inputError, setError] = useState({})
  const [warehouseList, setWarehouseList] = useState({
    selected: null,
    choices: [],
    id: null,
  })
  const [subArea, setSubArea] = useState({
    selected: null,
    choices: [],
    id: null,
  })
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

  const getWarehouseList = async () => {
    try {
      const { result } = await requestHandler('/warehouse', true, {}, 'get')
      setWarehouseList({
        ...warehouseList,
        choices: result,
        selected: result[0].warehouse_name,
        id: result[0].id,
      })
    } catch (error) {
      history.goBack()
    }
  }

  const getSubArea = async (id) => {
    try {
      const { result } = await requestHandler(
        '/warehouse',
        true,
        { getWarehouseArea: id },
        'get',
      )
      setSubArea({
        ...subArea,
        choices: result,
        selected: result[0].area_name,
        id: result[0].id,
      })
      setProductData({ ...productData, location: result[0].id })
    } catch (error) {
      history.goBack()
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

    if (isFirstCharacterSpace(value)) {
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

  useEffect(() => {
    getWarehouseList()
  }, [])

  useEffect(() => {
    if (warehouseList.id) {
      getSubArea(warehouseList.id)
    }
  }, [warehouseList.id])

  const onChangeWarehouse = (index) =>
    setWarehouseList({
      ...warehouseList,
      selected: warehouseList.choices[index].warehouse_name,
      id: warehouseList.choices[index].id,
    })

  const onChangeArea = (index) => {
    setSubArea({
      ...subArea,
      selected: subArea.choices[index].area_name,
      id: subArea.choices[index].id,
    })

    setProductData({ ...productData, location: subArea.choices[index].id })
  }

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
          <div className='dropdown-wrapper'>
            <DropDown
              selectedValue={warehouseList.selected}
              choices={warehouseList.choices}
              onSelect={onChangeWarehouse}
              width='initial'
              isCenter={false}
              field='warehouse_name'
              placeholder={false}
            />
            <span className='placeholder'>Warehouse</span>
          </div>
          <div className='dropdown-wrapper'>
            <DropDown
              selectedValue={subArea.selected}
              choices={subArea.choices}
              onSelect={onChangeArea}
              width='initial'
              isCenter={false}
              field='area_name'
              placeholder={false}
            />
            <span className='placeholder'>Location</span>
          </div>
          <TextArea
            placeholder='Detail'
            onValueChange={onValueChange}
            valueType='detail'
            border
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
