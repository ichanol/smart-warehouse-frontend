import { Container } from './TopPanelStyle'
import { ROUTER_PATH } from '../../Constant'
import React from 'react'
import { useHistory } from 'react-router-dom'

const TopPanel = () => {
  const history = useHistory()
  return (
    <Container>
      <div className='wrapper'>
        <div
          className='profile'
          onClick={() => history.push(ROUTER_PATH.userSettings.path)}>
          <div className='thumbnail' />
          <span>USERNAME</span>
        </div>
      </div>
    </Container>
  )
}

export default TopPanel
