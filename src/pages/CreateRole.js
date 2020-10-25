import { CancelButton, SubmitButton, ToggleButton } from '../components/Button'
import { Container, PermissionSection } from './CreateRoleStyle'
import React, { useEffect, useRef, useState } from 'react'

import TextArea from '../components/Input/TextArea/TextArea'
import TextInput from '../components/Input/TextInput/TextInput'
import atomState from '../Atoms/Atoms'
import clsx from 'clsx'
import { postRequest } from '../Services'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

const CreateRole = () => {
  const { register, handleSubmit, errors } = useForm()
  const history = useHistory()
  const detailRef = useRef([])
  const userState = useRecoilValue(atomState.userState)
  const [roleData, setRoleData] = useState({
    role_name: '',
    detail: '',
    status: true,
    permission: {
      importExport: false,
      map: false,
      overview: false,
      productList: false,
      productManagement: false,
      roleManagement: false,
      transaction: false,
      userManagement: false,
    },
  })
  const [permissionCheckBox, setPermissionCheckBox] = useState([])

  const onSubmit = async () => {
    const URL = `${process.env.REACT_APP_API}/roles`
    const response = await postRequest(URL, roleData, userState.accessToken)
    console.log(response)
  }

  const onCancel = () => history.goBack()

  const onValueChange = (value, TYPE) => {
    const temp = { ...roleData }
    temp[TYPE] = value
    console.log(TYPE, temp[TYPE])
    setRoleData(temp)
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
    const acc = { ...roleData }
    acc.permission = someObj
    setRoleData(acc)
  }

  const checkDetailElementHeight = async () => {
    const temp = []
    for (const [key, value] of Object.entries(roleData.permission)) {
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

  return (
    <Container>
      <div className='header'>
        <span>Create New Role</span>
        {errors.roleName?.type === 'required' && 'Rolename is require'}
        {errors.roleName?.type === 'maxLength' && 'Rolename is over the limit'}
      </div>
      <div className='content'>
        <form onSubmit={handleSubmit(() => alert('test'))}>
          <TextInput
            name='roleName'
            ref={register({ required: true, maxLength: 20 })}
            //maxLength='10'
            onValueChange={onValueChange}
            valueType='role_name'
            value={roleData.role_name}
            placeholder='Role name'
          />
          <TextArea
            onValueChange={onValueChange}
            valueType='detail'
            value={roleData.detail}
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
            {/* <SubmitButton action={onSubmit} /> */}
            <button type='submit'>+</button>
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
