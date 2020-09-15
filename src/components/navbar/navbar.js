import React from 'react'
import { Navigatebar, Head, Logo, Lists, LinkStyled, List } from './navbarStyle'

function Navbar() {

  return (
    <Navigatebar>
      <Head>
        <Logo to='/menu' >Smart Warehouse</Logo>
      </Head>
      <Lists>
        <List><LinkStyled to='/import-export'>Import - Export</LinkStyled></List>
        <List><LinkStyled>IPS Tracking</LinkStyled></List>
        <List><LinkStyled to='/history'>History</LinkStyled></List>
        <List><LinkStyled to='/inventory'>Inventory</LinkStyled></List>
      </Lists>
    </Navigatebar>
  )
}

export default Navbar
