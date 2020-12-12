import { Container, Profile } from './TopPanelStyle'
import { LogOutIcon, ProfileSettingIcon } from '../Icon'
import React, { useState } from 'react'

import { ROUTER_PATH } from '../../Constant'
import { atomState } from '../../Atoms'
import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

const TopPanel = () => {
  const history = useHistory()
  const userState = useRecoilValue(atomState.userState)

  const [isDismissMenu, setIsDismissMenu] = useState(false)

  const onClickSetting = () => history.push(ROUTER_PATH.userSettings.path)
  const onClickLogOut = () => {
    window.localStorage.clear()
    history.push(ROUTER_PATH.login.path)
  }
  return (
    <Container>
      <Profile onChange={() => setIsDismissMenu(!isDismissMenu)}>
        <div className='thumbnail' />
        <span>{userState.username}</span>
        <input type='checkbox' />
        <div className='profile-context-menu'>
          <div className='profile-menu' onClick={onClickSetting}>
            <ProfileSettingIcon />
            <span className='profile-menu-title'>Profile</span>
          </div>
          <div className='profile-menu' onClick={onClickLogOut}>
            <LogOutIcon />
            <span className='profile-menu-title'>Log out</span>
          </div>
        </div>
        {isDismissMenu && <div className='dismiss-menu' />}
      </Profile>
    </Container>
  )
}

export default TopPanel
