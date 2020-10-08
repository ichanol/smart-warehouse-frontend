import {
  HistoryIcon,
  ImportExportProductIcon,
  MapIcon,
  OverviewIcon,
  PermissionIcon,
  ProductIcon,
  ProductListIcon,
  UserIcon,
} from '../Icon'
import { Logo, SideBar } from './NavBarStyle'
import React, { useState } from 'react'

import { NavLink } from 'react-router-dom'

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const toggleMenu = () => setOpenMenu(!openMenu)
  const closeMenu = () => setOpenMenu(false)

  return (
    <SideBar open={openMenu}>
      <Logo>
        <span>LOGO</span>
      </Logo>
      <div className='hamburger' onClick={toggleMenu}>
        <div className='line' />
        <div className='line' />
        <div className='line' />
      </div>
      <NavLink
        to='/overview'
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <OverviewIcon />
        <span>Overview</span>
      </NavLink>
      <NavLink
        to='/product-list'
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <ProductListIcon />
        <span>Product list</span>
      </NavLink>
      <NavLink
        to='/import-export'
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <ImportExportProductIcon />
        <span>Import - Export Product</span>
      </NavLink>
      <NavLink
        to='/transaction'
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <HistoryIcon />
        <span>Transaction</span>
      </NavLink>
      <NavLink
        to='/map'
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <MapIcon />
        <span>Map</span>
      </NavLink>
      <span className='header-text'>ADMIN</span>
      <NavLink
        to='/user-management'
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <UserIcon />
        <span>User management</span>
      </NavLink>
      <NavLink
        to='/product-management'
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <ProductIcon />
        <span>Product management</span>
      </NavLink>
      <NavLink
        to='/role-management'
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <PermissionIcon />
        <span>Role management</span>
      </NavLink>
    </SideBar>
  )
}

export default NavBar
