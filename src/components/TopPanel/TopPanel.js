import { Container } from './TopPanelStyle'
import { ROUTER_PATH } from '../../Constant'
import React from 'react'
import { atomState } from '../../Atoms'
import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

const TopPanel = () => {
  const history = useHistory()
  const userState = useRecoilValue(atomState.userState)

  return (
    <Container>
        <div
          className='profile'
          onClick={() => history.push(ROUTER_PATH.userSettings.path)}>
          <div className='thumbnail' />
          <span>{userState.username}</span>
        </div>
    </Container>
  )
}

export default TopPanel
