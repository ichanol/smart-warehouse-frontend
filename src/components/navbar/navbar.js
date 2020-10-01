import React from 'react'
import PropTypes from 'prop-types'
import {
  Navigatebar,
  Head,
  Logo,
  Lists,
  LinkStyled,
  List,
  TextMenu,
} from './navbarStyle'

function Navbar({ selectedMenu }) {
  return (
    <Navigatebar>
      <Head>
        <Logo to='/menu' >Smart Warehouse</Logo>
      </Head>
      <Lists>
        <List
          className={selectedMenu === 1 && 'active'}
        >
          <LinkStyled
            to='/import-export'
          >
            <TextMenu>Import - Export</TextMenu>
          </LinkStyled>
        </List>
        <List
          className={selectedMenu === 2 && 'active'}
        >
          <LinkStyled>
            <TextMenu>IPS Tracking</TextMenu>
          </LinkStyled>
        </List>
        <List
          className={selectedMenu === 3 && 'active'}
        >
          <LinkStyled
            to='/history'
          >
            <TextMenu>History</TextMenu>
          </LinkStyled>
        </List>
        <List
          className={selectedMenu === 4 && 'active'}
        >
          <LinkStyled
            to='/inventory'
          >
            <TextMenu>Inventory</TextMenu>
          </LinkStyled>
        </List>
      </Lists>
    </Navigatebar>
  )
}

Navbar.defaultProps = {
  selectedMenu: 0,
}

Navbar.propTypes = {
  selectedMenu: PropTypes.number,
}

export default Navbar
