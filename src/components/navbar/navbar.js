import React from 'react'
import { Navigatebar, Logo, Lists, Link, List } from './navbarStyle'

function Navbar() {

  return (
    <Navigatebar>
      <Logo>
        <a><label>Smart Warehouse</label></a>
      </Logo>
      <Lists>
        <Link href='#'><List>Import - Export</List></Link>
        <Link href='#'><List>IPS Tracking</List></Link>
        <Link href='#'><List>History</List></Link>
        <Link href='#'><List>Inventory</List></Link>
      </Lists>
    </Navigatebar>
  )
}

export default Navbar
