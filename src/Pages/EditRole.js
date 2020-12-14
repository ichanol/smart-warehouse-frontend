import {
  CancelButton,
  SubmitButton,
  TextArea,
  TextInput,
  ToggleButton,
} from '../components'
import { Container, PermissionSection } from './EditRoleStyle'
import React, { useEffect, useRef, useState } from 'react'
import {
  isContainSpecialCharacter,
  isFirstCharacterSpace,
} from '../Utils/inputValidation'
import { useHistory, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'

import atomState from '../Atoms/Atoms'
import clsx from 'clsx'
import { debounce } from 'lodash'
import { requestHandler } from '../Services'

const EditRole = () => {
  const history = useHistory()
  const { rolename } = useParams()

  const choicesDetailRef = useRef([])
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  const [toastState, setToastState] = useRecoilState(atomState.toastState)
  const roleListState = useRecoilValue(atomState.roleListState)

  const [permissionCheckBox, setPermissionCheckBox] = useState([])
  const [inputError, setError] = useState({})
  const [editedRoleData, setEditedRoleData] = useState({})

  const onSubmit = async () => {
    try {
      const { success } = await requestHandler(
        '/roles',
        true,
        editedRoleData,
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

  const onValueChange = debounce((value, TYPE) => {
    const tempError = { ...inputError }

    if (TYPE === 'role_name') {
      if (isFirstCharacterSpace(value)) {
        tempError[TYPE] = 'First Character should be alphabet'
      } else if (isContainSpecialCharacter(value)) {
        tempError[TYPE] = 'a-z, A-Z, ก-ฮ, 0-9'
      } else {
        tempError[TYPE] = null
      }
    }

    const updateEditedRoleData = { ...editedRoleData }
    updateEditedRoleData[TYPE] = value

    setError(tempError)
    setEditedRoleData(updateEditedRoleData)
    return true
  }, 300)

  const onExpandDetail = (primaryIndex) => {
    const temp = permissionCheckBox.map((value, index) => {
      if (index === primaryIndex) {
        value.expand = !value.expand
      }
      return value
    })
    setPermissionCheckBox(temp)
  }

  const onToggle = (primaryIndex) => {
    const editedPermission = permissionCheckBox.map((value) => ({
      permission: value.id,
      status: value.status,
    }))
    editedPermission[primaryIndex].status = !editedPermission[primaryIndex]
      .status

    const acc = { ...editedRoleData }
    acc.permission = editedPermission
    setEditedRoleData(acc)

    const updatedPermissionCheckBox = [...permissionCheckBox]
    updatedPermissionCheckBox[primaryIndex].status = !updatedPermissionCheckBox[
      primaryIndex
    ].status
    setPermissionCheckBox(updatedPermissionCheckBox)
  }

  const checkDetailElementHeight = async (permission) => {
    const temp = permission.map((value) => ({
      permission: value.permission_name,
      id: value.id,
      status: value.status,
      expand: false,
      showExpand: false,
      detail: value.detail,
    }))

    await setPermissionCheckBox(temp)
    const acc = [...temp]
    choicesDetailRef.current.map((value, index) => {
      if (value.clientHeight >= 50) {
        acc[index].showExpand = true
      }
    })
    setPermissionCheckBox(acc)
  }

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

  useEffect(() => {
    if (rolename) {
      const [selectedRole] = roleListState.filter(
        (value) => value.role_name === rolename,
      )
      if (selectedRole) {
        console.log(selectedRole)
        checkDetailElementHeight(selectedRole?.permission)
        const rolePermission = selectedRole?.permission?.map((value) => ({
          permission: value.id,
          status: value.status,
        }))
        setEditedRoleData({
          detail: selectedRole?.detail,
          role_name: selectedRole?.role_name,
          permission: rolePermission,
          id: selectedRole?.id,
        })
      } else {
        history.push('/role-management')
      }
    } else {
      history.push('/role-management')
    }
  }, [])

  return (
    <Container ref={(ref) => (containerRef.current = ref)}>
      <div className='header'>
        <span>Edit Role Information</span>
      </div>
      <div className='content'>
        <form onSubmit={validateInputForm}>
          <TextInput
            required
            ref={inputRef}
            error={inputError.role_name}
            maxLength='20'
            onValueChange={onValueChange}
            valueType='role_name'
            placeholder='Role name'
            defaultValue={editedRoleData.role_name}
          />
          <TextArea
            onValueChange={onValueChange}
            valueType='detail'
            placeholder='Detail'
            defaultValue={editedRoleData.detail}
            border
          />
          <div className='title'>Permission</div>
          <PermissionSection>
            {permissionCheckBox.map((value, index) => (
              <div
                key={index}
                className={clsx('permission-list', value.expand && 'expand')}>
                <div className='permission-title'>{value.permission}</div>
                <div className='permission-detail-container'>
                  <div
                    ref={(ref) => (choicesDetailRef.current[index] = ref)}
                    className={clsx(
                      'permission-detail',
                      value.showExpand && 'collapse',
                      value.expand && 'expand',
                    )}>
                    {value.detail}
                  </div>
                </div>
                <div className='toggle-button-wrapper'>
                  <ToggleButton
                    action={() => onToggle(index)}
                    value={value.status}
                  />
                </div>
                {value.showExpand && (
                  <div
                    className='expand-button'
                    onClick={() => onExpandDetail(index)}>
                    {value.expand ? 'See less' : 'See more'}
                  </div>
                )}
              </div>
            ))}
          </PermissionSection>
          <div className='button-wrapper'>
            <SubmitButton type='submit' />
            <div className='cancel-button-wrapper'>
              <CancelButton action={onCancel} />
            </div>
          </div>
        </form>
      </div>
    </Container>
  )
}
export default EditRole
