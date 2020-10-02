import React from 'react'
import {
  Container,
  SideBar,
  Content,
  Logo,
  Header,
  DashBoard,
} from './NewMenuStyle'

const NewMenu = () => {
  return (
    <Container>
      <SideBar>
        <Logo>
          <span>LOGO</span>
        </Logo>
        <div className='menu'>
          <span>Overview</span>
        </div>
        <div className='menu'>
          <span>Product list</span>
        </div>
        <div className='menu'>
          <span>Import - Export Product</span>
        </div>
        <div className='menu'>
          <span>Transaction</span>
        </div>
        <div className='menu'>
          <span>Map</span>
        </div>
        <div className='menu'>
          <span>User management</span>
        </div>
        <div className='menu'>
          <span>Product management</span>
        </div>
        <div className='menu'>
          <span>Role management</span>
        </div>
      </SideBar>
      <Content>
        <Header>
          <div className='user-plate'>
            <div className='profile-picture' />
            <span>username</span>
          </div>
        </Header>
        <DashBoard>
          <div>
            <span>Graph</span>
          </div>
          <div>
            <div className='card' />
            <div className='card' />
            <div className='card' />
          </div>
        </DashBoard>
      </Content>
    </Container>
  )
}

export default NewMenu
