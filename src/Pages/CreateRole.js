import {
  CancelButton,
  SubmitButton,
  TextArea,
  TextInput,
  ToggleButton,
} from '../components'
import { Container, PermissionSection } from './CreateRoleStyle'
import React, { useEffect, useRef, useState } from 'react'
import {
  isContainSpecialCharacter,
  isFirstCharacterSpace,
} from '../Utils/inputValidation'

import atomState from '../Atoms/Atoms'
import clsx from 'clsx'
import { debounce } from 'lodash'
import { requestHandler } from '../Services'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'

const CreateRole = () => {
  const history = useHistory()

  const [toastState, setToastState] = useRecoilState(atomState.toastState)

  const choicesDetailRef = useRef([])
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  const [permissionCheckBox, setPermissionCheckBox] = useState([])
  const [inputError, setError] = useState({})
  const [roleData, setRoleData] = useState({
    role_name: '',
    detail: '',
    permission: [],
  })

  const onSubmit = async () => {
    try {
      const { success } = await requestHandler('/roles', true, roleData, 'post')
      if (success) {
        setToastState([
          ...toastState,
          {
            onClick: () => {},
            title: 'Success',
            message: 'New role has been created',
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

  const checkDuplicate = async (keyword, TYPE) => {
    try {
      const { result } = await requestHandler(
        '/roles',
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
    } else if (isContainSpecialCharacter(value)) {
      tempError[TYPE] = 'a-z, A-Z, ก-ฮ, 0-9'
    } else {
      tempError[TYPE] = null
    }

    if (TYPE === 'role_name' && value !== '' && tempError[TYPE] === null) {
      checkDuplicate(value, TYPE)
    }

    const updateRoleData = { ...roleData }
    updateRoleData[TYPE] = value

    setError(tempError)
    setRoleData(updateRoleData)
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
    const temp = [...permissionCheckBox]
    temp[primaryIndex].status = !temp[primaryIndex].status
    setPermissionCheckBox(temp)

    const updatedRoleData = temp.map((value) => ({
      id: value.id,
      status: value.status,
    }))
    setRoleData({ ...roleData, permission: updatedRoleData })
  }

  const checkDetailElementHeight = async (permission) => {
    const temp = permission.map((value) => ({
      permission: value.permission_name,
      id: value.id,
      status: false,
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
      containerRef.current.scrollTop = inputRef.current.offsetParent.offsetTop
    } else {
      onSubmit()
    }
  }

  const getPermissionList = async () => {
    try {
      const { success, result } = await requestHandler(
        '/roles',
        true,
        { getPermission: true },
        'get',
      )

      if (success) {
        const permission = result.map((value) => ({
          id: value.id,
          status: false,
        }))
        setRoleData({ ...roleData, permission })
        checkDetailElementHeight(result)
      }
    } catch (error) {
      history.goBack()
    }
  }

  useEffect(() => {
    getPermissionList()
  }, [])

  return (
    <Container
      ref={(ref) => {
        containerRef.current = ref
      }}>
      <div className='header'>
        <span>Create New Role</span>
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
          />
          <TextArea
            onValueChange={onValueChange}
            valueType='detail'
            value={roleData.detail}
            placeholder='Detail'
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
                    ref={(ref) => {
                      choicesDetailRef.current[index] = ref
                    }}
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
export default CreateRole
