import { CancelButton, SubmitButton, ToggleButton } from '../components/Button'
import { Container, PermissionSection } from './EditRoleStyle'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'

import TextArea from '../components/Input/TextArea/TextArea'
import TextInput from '../components/Input/TextInput/TextInput'
import atomState from '../Atoms/Atoms'
import clsx from 'clsx'
import { debounce } from 'lodash'
import { putRequest } from '../Services'

const EditRole = () => {
  const history = useHistory()
  const choicesDetailRef = useRef([])
  const inputRef = useRef(null)
  const containerRef = useRef(null)
  const userState = useRecoilValue(atomState.userState)
  const [toastState, setToastState] = useRecoilState(atomState.toastState)
  const [permissionCheckBox, setPermissionCheckBox] = useState([])
  const [inputError, setError] = useState({})
  const { rolename } = useParams()

  const roleListState = useRecoilValue(atomState.roleListState)
  const [selectedRole] = roleListState.filter(
    (value) => value.role_name === rolename,
  )
  const [editedRoleData, setEditedRoleData] = useState({
    detail: selectedRole?.detail,
    role_name: selectedRole?.role_name,
    permission: selectedRole?.permission,
    id: selectedRole?.id,
  })

  const onSubmit = async () => {
    try {
      const URL = `${process.env.REACT_APP_API}/roles`
      const { success } = await putRequest(
        URL,
        editedRoleData,
        userState.accessToken,
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

  const onValueChange = debounce((value, TYPE) => {
    const tempError = { ...inputError }
    if (TYPE === 'role_name') {
      if (/^\s.*$/.exec(value)) {
        tempError[TYPE] = 'First Character can not be a space'
      } else if (/[!@#$%^&*(),.?":;'/\\{}|<>_+\-~\d]/.exec(value)) {
        tempError[TYPE] = 'a-z, A-Z, ก-ฮ'
      } else {
        tempError[TYPE] = null
      }
    }
    setError(tempError)
    const temp = { ...editedRoleData }
    temp[TYPE] = value
    setEditedRoleData(temp)
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
    temp[primaryIndex].value = !temp[primaryIndex].value
    const someObj = {}
    permissionCheckBox.map((value, index) => {
      someObj[value.key] = value.value
    })
    const acc = { ...editedRoleData }
    acc.permission = someObj
    setEditedRoleData(acc)
  }

  const checkDetailElementHeight = async () => {
    const temp = []
    for (const [key, value] of Object.entries(editedRoleData.permission)) {
      temp.push({ key, value, expand: false, showExpand: false })
    }
    await setPermissionCheckBox(temp)
    const acc = [...temp]
    choicesDetailRef.current.map((value, index) => {
      if (value.clientHeight >= 75) {
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

  useEffect(() => {
    if (!rolename || !selectedRole) {
      history.push('/role-management')
    } else {
      checkDetailElementHeight()
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
          />
          <div className='title'>Permission</div>
          <PermissionSection>
            {permissionCheckBox.map((value, index) => (
              <div
                key={index}
                className={clsx('permission-list', value.expand && 'expand')}>
                <div className='permission-title'>{value.key}</div>
                <div className='permission-detail-container'>
                  <div
                    ref={(ref) => (choicesDetailRef.current[index] = ref)}
                    className={clsx(
                      'permission-detail',
                      value.showExpand && 'collapse',
                      value.expand && 'expand',
                    )}>
                    Nostrud enim fugiat ipsum laboris cillum dolor minim
                    consectetur. Ex nulla quis nulla consectetur anim labore
                    dolor quis ad est non. Eiusmod cillum consequat Lorem fugiat
                    ad. Dolor aliqua ea commodo nostrud veniam irure occaecat
                    est exercitation. Ex do Lorem commodo officia eu incididunt
                    ad veniam esse nostrud quis dolore duis excepteur. Ea
                    ullamco eu ipsum aliquip aliquip exercitation amet. Labore
                    pariatur esse culpa dolor occaecat consectetur officia esse
                    laborum nisi deserunt. Id excepteur reprehenderit labore
                    minim sit velit sunt laboris. Laboris anim velit culpa
                    pariatur consectetur velit cupidatat esse qui adipisicing
                    adipisicing ullamco. Ex ea duis ut exercitation. Pariatur ex
                    ipsum nulla ipsum eiusmod.
                  </div>
                </div>
                <div className='toggle-button-wrapper'>
                  <ToggleButton
                    action={() => onToggle(index)}
                    value={value.value}
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
