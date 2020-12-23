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
import { useHistory, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Container } from './EditProductStyle'
import atomState from '../Atoms/Atoms'
import { debounce } from 'lodash'
import { requestHandler } from '../Services'

const CreateProduct = () => {
  const history = useHistory()
  const { productid } = useParams()

  const [toastState, setToastState] = useRecoilState(atomState.toastState)
  const productListState = useRecoilValue(atomState.productListState)

  const [trigger, setTrigger] = useState(true)
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
  const [editedProductData, setEditedProductData] = useState({})

  const getWarehouseList = async () => {
    try {
      const { result } = await requestHandler('/warehouse', true, {}, 'get')
      setWarehouseList({
        ...warehouseList,
        choices: result,
        selected: result[0].warehouse_name,
        id: result[0].id,
      })
      return result
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
      return result
    } catch (error) {
      history.goBack()
    }
  }

  const getLocationHandler = async (editProductObj) => {
    const warehouseResult = await getWarehouseList()
    const subAreaResult = await getSubArea(editProductObj.warehouse)
    if (warehouseResult && subAreaResult) {
      const [selectedWarehouse] = warehouseResult.filter(
        (value) => value.id === editProductObj.warehouse,
      )
      const [selectedSubArea] = subAreaResult.filter(
        (value) => value.id === editProductObj.location,
      )
      setWarehouseList({
        ...warehouseList,
        choices: warehouseResult,
        selected: selectedWarehouse.warehouse_name,
        id: selectedWarehouse.id,
      })

      setSubArea({
        ...subArea,
        choices: subAreaResult,
        selected: selectedSubArea.area_name,
        id: selectedSubArea.id,
      })
    } else {
      history.goBack()
    }
  }

  const onSubmit = async () => {
    try {
      const { success } = await requestHandler(
        '/products',
        true,
        editedProductData,
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
    } catch (error) {
      setToastState((oldState) => [
        ...oldState,
        {
          onClick: () => {},
          title: 'Failed',
          message: 'Failed to save changes. Try again.',
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

    const updateEditedProductData = { ...editedProductData }
    updateEditedProductData[TYPE] = value

    setError(tempError)
    setEditedProductData(updateEditedProductData)
  }, 300)

  const subAreaHandler = async () => {
    const result = await getSubArea(warehouseList.id)
    setSubArea({
      ...subArea,
      choices: result,
      selected: result[0].area_name,
      id: result[0].id,
    })
  }

  const onChangeWarehouse = (index) => {
    setWarehouseList({
      ...warehouseList,
      selected: warehouseList.choices[index].warehouse_name,
      id: warehouseList.choices[index].id,
    })

    setTrigger(!trigger)
  }

  const onChangeArea = (index) => {
    setSubArea({
      ...subArea,
      selected: subArea.choices[index].area_name,
      id: subArea.choices[index].id,
    })

    setEditedProductData({
      ...editedProductData,
      location: subArea.choices[index].id,
    })
  }

  useEffect(() => {
    if (warehouseList.id) {
      subAreaHandler()
    }
  }, [trigger])

  useEffect(() => {
    if (productid) {
      const [selectedProduct] = productListState.filter(
        (value) => value.product_id === productid,
      )
      if (selectedProduct) {
        const editProductObj = {
          company_name: selectedProduct?.company_name,
          detail: selectedProduct?.detail,
          location: selectedProduct?.location_id,
          warehouse: selectedProduct?.warehouse_id,
          product_id: selectedProduct?.product_id,
          product_name: selectedProduct?.product_name,
          status: selectedProduct?.status,
        }
        setEditedProductData(editProductObj)
        getLocationHandler(editProductObj)
      } else {
        history.push('/product-management')
      }
    } else {
      history.push('/product-management')
    }
  }, [])

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
            defaultValue={editedProductData.detail}
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
