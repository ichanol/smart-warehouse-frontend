import { CancelButton, SubmitButton, ToggleButton } from '../components/Button'
import { Container, PermissionSection } from './EditRoleStyle'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import TextArea from '../components/Input/TextArea/TextArea'
import TextInput from '../components/Input/TextInput/TextInput'
import atomState from '../Atoms/Atoms'
import clsx from 'clsx'
import { putRequest } from '../Services'
import { useRecoilValue } from 'recoil'

const EditImportExportProduct = () => {
  const { rolename } = useParams()
  const history = useHistory()
  const detailRef = useRef([])

  const roleListState = useRecoilValue(atomState.roleListState)
  const userState = useRecoilValue(atomState.userState)
  const [selectedRole] = roleListState.filter(
    (value) => value.role_name === rolename,
  )
  const [editedProductData, setEditedProductData] = useState({
    detail: selectedRole.detail,
    role_name: selectedRole.role_name,
    permission: selectedRole.permission,
    id: selectedRole.id,
  })
  const [permissionCheckBox, setPermissionCheckBox] = useState([])

  const checkDetailElementHeight = async () => {
    const temp = []
    for (const [key, value] of Object.entries(editedProductData.permission)) {
      temp.push({ key, value, expand: false, showExpand: false })
    }
    await setPermissionCheckBox(temp)
    const acc = [...temp]
    detailRef.current.map((value, index) => {
      if (value.clientHeight >= 75) {
        acc[index].showExpand = true
      }
    })
    setPermissionCheckBox(acc)
  }

  useEffect(() => {
    checkDetailElementHeight()
  }, [])

  const onSubmit = async () => {
    const URL = `${process.env.REACT_APP_API}/roles`
    const { success } = await putRequest(
      URL,
      editedProductData,
      userState.accessToken,
    )
    if (success) {
      history.goBack()
    }
  }

  const onCancel = () => history.goBack()

  const onValueChange = (value, TYPE) => {
    const temp = { ...editedProductData }
    temp[TYPE] = value
    setEditedProductData(temp)
  }

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
    const acc = { ...editedProductData }
    acc.permission = someObj
    setEditedProductData(acc)
  }

  return (
    <Container>
      <div className='header'>
        <span>Edit Role Information</span>
      </div>
      <div className='content'>
        <TextInput
          onValueChange={onValueChange}
          valueType='role_name'
          value={editedProductData.role_name}
          placeholder='Role name'
        />
        <TextArea
          onValueChange={onValueChange}
          valueType='detail'
          value={editedProductData.detail}
          placeholder='Detail'
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
                  ref={(ref) => (detailRef.current[index] = ref)}
                  className={clsx(
                    'permission-detail',
                    value.showExpand && 'collapse',
                    value.expand && 'expand',
                  )}>
                  Nostrud enim fugiat ipsum laboris cillum dolor minim
                  consectetur. Ex nulla quis nulla consectetur anim labore dolor
                  quis ad est non. Eiusmod cillum consequat Lorem fugiat ad.
                  Dolor aliqua ea commodo nostrud veniam irure occaecat est
                  exercitation. Ex do Lorem commodo officia eu incididunt ad
                  veniam esse nostrud quis dolore duis excepteur. Ea ullamco eu
                  ipsum aliquip aliquip exercitation amet. Labore pariatur esse
                  culpa dolor occaecat consectetur officia esse laborum nisi
                  deserunt. Id excepteur reprehenderit labore minim sit velit
                  sunt laboris. Laboris anim velit culpa pariatur consectetur
                  velit cupidatat esse qui adipisicing adipisicing ullamco. Ex
                  ea duis ut exercitation. Pariatur ex ipsum nulla ipsum
                  eiusmod.
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
          <SubmitButton action={onSubmit} />
          <div className='cancel-button-wrapper'>
            <CancelButton action={onCancel} />
          </div>
        </div>
      </div>
    </Container>
  )
}
export default EditImportExportProduct
