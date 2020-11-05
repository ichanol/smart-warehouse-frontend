import { CancelButton, DropDown, SubmitButton } from '../components'
import React, { useEffect, useRef, useState } from 'react'
import {
  engIsContainSpecialCharacter,
  isContainSpecialCharacter,
  isFirstCharacterSpace,
} from '../Utils/inputValidation'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Container } from './CreateUserStyle'
import TextArea from '../components/Input/TextArea/TextArea'
import TextInput from '../components/Input/TextInput/TextInput'
import atomState from '../Atoms/Atoms'
import { debounce } from 'lodash'
import { request } from '../Services'
import { useHistory } from 'react-router-dom'

const CreateUser = () => {
  const history = useHistory()

  const dropDownRef = useRef()

  const userState = useRecoilValue(atomState.userState)
  const [toastState, setToastState] = useRecoilState(atomState.toastState)

  const [inputError, setError] = useState({})
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    role: '1',
    detail: '',
    status: true,
  })

  const queryParams = {
    get_role: true,
  }

  const getRoleList = async () => {
    try {
      const { success, result } = await request(
        '/roles',
        queryParams,
        userState.accessToken,
        'get',
      )
      if (success) {
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRoleList()
  }, [])

  const onSubmit = async () => {
    try {
      const { success } = await request(
        '/users',
        userData,
        userState.accessToken,
        'post',
      )
      if (success) {
        setToastState([
          ...toastState,
          {
            onClick: () => {},
            title: 'Success',
            message: 'New user has been created',
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
      const { result } = await request(
        '/products',
        { validate: keyword },
        userState.accessToken,
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
    } else if (engIsContainSpecialCharacter(value) && TYPE === 'username') {
      tempError[TYPE] = 'a-z, A-Z, 0-9'
    } else if (isContainSpecialCharacter(value)) {
      tempError[TYPE] = 'a-z, A-Z, ก-ฮ, 0-9'
    } else {
      tempError[TYPE] = null
    }

    if (TYPE === 'product_id' && value !== '' && tempError[TYPE] === null) {
      checkDuplicate(value, TYPE)
    }

    const updateProductData = { ...userData }
    updateProductData[TYPE] = value

    setError(tempError)
    setUserData(updateProductData)
  }, 300)

  return (
    <Container>
      <div className='header'>
        <span>Create New User</span>
      </div>
      <form onSubmit={validateInputForm}>
        <div className='content'>
          <TextInput
            required
            placeholder='Username'
            onValueChange={onValueChange}
            valueType='username'
            maxLength='10'
            error={inputError.username}
          />
          <TextInput
            required
            placeholder='E-mail'
            onValueChange={onValueChange}
            valueType='email'
            maxLength='10'
            error={inputError.email}
          />
          <TextInput
            required
            placeholder='Firstname'
            onValueChange={onValueChange}
            valueType='firstname'
            maxLength='10'
            error={inputError.firstname}
          />
          <TextInput
            required
            placeholder='Lastname'
            onValueChange={onValueChange}
            valueType='lastname'
            maxLength='30'
            error={inputError.lastname}
          />
          <TextInput
            required
            type='password'
            placeholder='Password'
            onValueChange={onValueChange}
            valueType='password'
            maxLength='40'
            error={inputError.password}
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
export default CreateUser
