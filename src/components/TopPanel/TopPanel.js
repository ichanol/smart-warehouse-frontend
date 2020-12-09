import { Container, Profile } from './TopPanelStyle'
import { LogOutIcon, ProfileSettingIcon } from '../Icon'

import { ROUTER_PATH } from '../../Constant'
import React from 'react'
import { atomState } from '../../Atoms'
import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

const TopPanel = () => {
  const history = useHistory()
  const userState = useRecoilValue(atomState.userState)

  const onClickSetting = () => history.push(ROUTER_PATH.userSettings.path)
  return (
    <Container>
      <Profile>
        <div className='thumbnail' />
        <span>{userState.username}</span>
        <input type='checkbox' />
        <div className='profile-context-menu'>
          <div className='profile-menu' onClick={onClickSetting}>
            <ProfileSettingIcon />
            <span className='profile-menu-title'>Profile</span>
          </div>
          <div className='profile-menu'>
            <LogOutIcon />
            <span className='profile-menu-title'>Log out</span>
          </div>
        </div>
      </Profile>
    </Container>
  )
}

export default TopPanel
