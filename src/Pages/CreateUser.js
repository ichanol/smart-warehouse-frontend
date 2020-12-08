import {
  CancelButton,
  DropDown,
  SubmitButton,
  TextArea,
  TextInput,
} from '../components'
import React, { useEffect, useRef, useState } from 'react'
import {
  engIsContainSpecialCharacter,
  isContainSpecialCharacter,
  isENorTH,
  isEmailInvalid,
  isFirstCharacterSpace,
} from '../Utils/inputValidation'

import { Container } from './CreateUserStyle'
import atomState from '../Atoms/Atoms'
import { debounce } from 'lodash'
import { requestHandler } from '../Services'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'

const CreateUser = () => {
  const history = useHistory()

  const dropDownRef = useRef()

  const [toastState, setToastState] = useRecoilState(atomState.toastState)

  const [inputError, setError] = useState({})
  const [role, setRole] = useState({ selected: null, choices: [] })
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    role: '',
    detail: '',
    status: true,
  })

  const getRoleList = async () => {
    try {
      const queryParams = {
        get_role: true,
      }

      const { success, result } = await requestHandler(
        '/roles',
        true,
        queryParams,
        'get',
      )
      if (success) {
        console.log(result)
        const temp = result.map((value, index) => value.role_name)
        setRole({ ...role, choices: temp, selected: temp[0] })
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
      const { success } = await requestHandler('/users', true, userData, 'post')
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
      const { result } = await requestHandler(
        '/users',
        true,
        { validate: keyword, type: TYPE },
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

  const onChangeRole = (roleName, primaryIndex) => {
    dropDownRef.current.scrollTop = 40 * (primaryIndex - 1)
    setRole({ ...role, selected: roleName })
    setUserData({ ...userData, role: roleName })
  }

  const onValueChange = debounce((value, TYPE) => {
    const tempError = { ...inputError }

    if (TYPE === 'detail') {
      tempError[TYPE] = null
    } else if (isFirstCharacterSpace(value)) {
      tempError[TYPE] = 'First Character should be alphabet'
    } else if (engIsContainSpecialCharacter(value) && TYPE === 'username') {
      tempError[TYPE] = 'a-z, A-Z, 0-9'
    } else if (isEmailInvalid(value) && TYPE === 'email') {
      tempError[TYPE] = 'Your e-mail address is invalid'
    } else if (
      isENorTH(value) &&
      (TYPE === 'firstname' || TYPE === 'lastname')
    ) {
      tempError[TYPE] = 'a-z, A-Z, ก-ฮ'
    } else if (isContainSpecialCharacter(value) && TYPE !== 'email') {
      tempError[TYPE] = 'a-z, A-Z, ก-ฮ, 0-9'
    } else {
      tempError[TYPE] = null
    }

    if (
      (TYPE === 'username' || TYPE === 'email') &&
      value !== '' &&
      tempError[TYPE] === null
    ) {
      checkDuplicate(value, TYPE)
    }

    const updateUserData = { ...userData }
    updateUserData[TYPE] = value

    setError(tempError)
    setUserData(updateUserData)
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
          <div className='dropdown-wrapper'>
            <DropDown
              ref={dropDownRef}
              selectedValue={role.selected}
              choices={role.choices}
              onSelect={onChangeRole}
              width='initial'
              isCenter={false}
            />
            <span className='placeholder'>Role</span>
          </div>
          <TextInput
            required
            placeholder='E-mail'
            onValueChange={onValueChange}
            valueType='email'
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
