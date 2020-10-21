import { Container } from './TopPanelStyle'
import { ROUTER_PATH } from '../../Constant'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { atomState } from '../../Atoms'

const TopPanel = () => {
  const history = useHistory()
  const username = useRecoilValue(atomState.userState)

  return (
    <Container>
      <div className='wrapper'>
        <div
          className='profile'
          onClick={() => history.push(ROUTER_PATH.userSettings.path)}>
          <div className='thumbnail' />
          <span>{username.username}</span>
        </div>
      </div>
    </Container>
  )
}

export default TopPanel
