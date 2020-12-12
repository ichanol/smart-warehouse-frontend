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
  isENorTH,
  isEmailInvalid,
  isFirstCharacterSpace,
} from '../Utils/inputValidation'
import { useHistory, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Container } from './EditUserStyle'
import atomState from '../Atoms/Atoms'
import { debounce } from 'lodash'
import { requestHandler } from '../Services'

const EditUser = () => {
  const history = useHistory()
  const { username } = useParams()

  const [toastState, setToastState] = useRecoilState(atomState.toastState)
  const userListState = useRecoilValue(atomState.userListState)

  const [inputError, setError] = useState({})
  const [editedUserData, setEditedUserData] = useState({})
  const [role, setRole] = useState({ selected: null, choices: [] })

  const getRoleList = async (currentRole) => {
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
        const temp = result.map((value, index) => value.role_name)
        setRole({ ...role, choices: temp, selected: currentRole })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (username) {
      const [selectedUser] = userListState.filter(
        (value) => value.username === username,
      )
      if (selectedUser) {
        setEditedUserData({
          id: selectedUser.id,
          username: selectedUser.username,
          email: selectedUser.email,
          firstname: selectedUser.firstname,
          lastname: selectedUser.lastname,
          role: selectedUser.role_name,
          password: selectedUser.password,
          detail: selectedUser.detail,
          status: selectedUser.status,
        })
        getRoleList(selectedUser.role_name)
      } else {
        history.push('/user-management')
      }
    } else {
      history.push('/user-management')
    }
  }, [])

  const onSubmit = async () => {
    try {
      const { success } = await requestHandler(
        '/users',
        true,
        editedUserData,
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

  const onChangeRole = (roleName) => {
    setRole({ ...role, selected: roleName })
    setEditedUserData({ ...editedUserData, role: roleName })
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

    const updateEditedUserData = { ...editedUserData }
    updateEditedUserData[TYPE] = value

    setError(tempError)
    setEditedUserData(updateEditedUserData)
  }, 300)

  return (
    <Container>
      <div className='header'>
        <span>Edit User Information</span>
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
            defaultValue={editedUserData.username}
          />
          <div className='dropdown-wrapper'>
            <DropDown
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
            defaultValue={editedUserData.email}
          />
          <TextInput
            required
            placeholder='Firstname'
            onValueChange={onValueChange}
            valueType='firstname'
            maxLength='10'
            error={inputError.firstname}
            defaultValue={editedUserData.firstname}
          />
          <TextInput
            required
            placeholder='Lastname'
            onValueChange={onValueChange}
            valueType='lastname'
            maxLength='30'
            error={inputError.lastname}
            defaultValue={editedUserData.lastname}
          />
          <TextArea
            placeholder='Detail'
            onValueChange={onValueChange}
            valueType='detail'
            defaultValue={editedUserData.detail}
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
export default EditUser
