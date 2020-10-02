import React, { useState } from 'react'
import { SideBar, Logo } from './NavBarStyle'
import { NavLink } from 'react-router-dom'
import {
  Overview,
  History,
  Map,
  ImportExportProduct,
  ProductList,
  Product,
  Permission,
  User,
} from '../Icon'

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
        <Overview width={40} />
        <span>Overview</span>
      </NavLink>
      <NavLink
        to='/product-list'
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <ProductList width={40} />
        <span>Product list</span>
      </NavLink>
      <NavLink
        to='/import-export'
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <ImportExportProduct width={40} />
        <span>Import - Export Product</span>
      </NavLink>
      <NavLink
        to='/transaction'
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <History width={40} />
        <span>Transaction</span>
      </NavLink>
      <NavLink
        to='/map'
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <Map width={40} />
        <span>Map</span>
      </NavLink>
      <span className='header-text'>ADMIN</span>
      <NavLink
        to='/user-management'
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <User width={40} />
        <span>User management</span>
      </NavLink>
      <NavLink
        to='/product-management'
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <Product width={40} />
        <span>Product management</span>
      </NavLink>
      <NavLink
        to='/role-management'
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <Permission width={40} />
        <span>Role management</span>
      </NavLink>
    </SideBar>
  )
}

export default NavBar
