import { CancelButton, SubmitButton } from '../components/Button'
import React, { useEffect, useState } from 'react'
import {
  engIsContainSpecialCharacter,
  isContainSpecialCharacter,
  isFirstCharacterSpace,
} from '../Utils/inputValidation'
import { useHistory, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Container } from './EditUserStyle'
import TextArea from '../components/Input/TextArea/TextArea'
import TextInput from '../components/Input/TextInput/TextInput'
import atomState from '../Atoms/Atoms'
import { debounce } from 'lodash'
import { request } from '../Services'

const EditUser = () => {
  const history = useHistory()
  const { username } = useParams()

  const userState = useRecoilValue(atomState.userState)
  const [toastState, setToastState] = useRecoilState(atomState.toastState)
  const userListState = useRecoilValue(atomState.userListState)

  const [inputError, setError] = useState({})
  const [editedUserData, setEditedUserData] = useState({})

  useEffect(() => {
    if (username) {
      const [selectedUser] = userListState.filter(
        (value) => value.username === username,
      )
      if (selectedUser) {
        setEditedUserData({
          username: selectedUser?.username,
          email: selectedUser?.email,
          firstname: selectedUser?.firstname,
          lastname: selectedUser?.lastname,
          role: selectedUser?.role,
          detail: selectedUser?.detail,
          status: selectedUser?.status,
        })
      } else {
        history.push('/user-management')
      }
    } else {
      history.push('/user-management')
    }
  }, [])

  const onSubmit = async () => {
    try {
      const { success } = await request(
        '/users',
        editedUserData,
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

    const updateEditedProductData = { ...editedUserData }
    updateEditedProductData[TYPE] = value

    setError(tempError)
    setEditedUserData(updateEditedProductData)
  }, 300)

  return (
    <Container>
      <div className='header'>
        <span>Edit User Information</span>
      </div>
      <form onSubmit={validateInputForm}>
        <div className='content'>
          <TextInput
            disabled
            required
            placeholder='Username'
            onValueChange={onValueChange}
            valueType='username'
            maxLength='10'
            error={inputError.username}
            defaultValue={editedUserData.username}
          />
          <TextInput
            required
            placeholder='E-mail'
            onValueChange={onValueChange}
            valueType='email'
            maxLength='10'
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
