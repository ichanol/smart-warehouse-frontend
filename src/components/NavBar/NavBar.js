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
import { ROUTER_PATH } from '../../Constant'
import { atomState } from '../../Atoms'
import { useRecoilValue } from 'recoil'

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const toggleMenu = () => setOpenMenu(!openMenu)
  const closeMenu = () => setOpenMenu(false)

  const { permission } = useRecoilValue(atomState.userState)

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
        to={ROUTER_PATH.overview.path}
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <OverviewIcon />
        <span>Overview</span>
      </NavLink>
      <NavLink
        to={ROUTER_PATH.currentProductBalance.path}
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <ProductListIcon />
        <span>Product list</span>
      </NavLink>
      <NavLink
        to={ROUTER_PATH.importExportMenu.path}
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <ImportExportProductIcon />
        <span>Import - Export Product</span>
      </NavLink>
      <NavLink
        to={ROUTER_PATH.transaction.path}
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <HistoryIcon />
        <span>Transaction</span>
      </NavLink>
      <NavLink
        to={ROUTER_PATH.map.path}
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <MapIcon />
        <span>Map</span>
      </NavLink>
      <span className='header-text'>ADMIN</span>
      <NavLink
        to={ROUTER_PATH.userManagement.path}
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <UserIcon />
        <span>User management</span>
      </NavLink>
      <NavLink
        to={ROUTER_PATH.productManagement.path}
        className='menu'
        activeClassName='active-menu'
        onClick={closeMenu}>
        <ProductIcon />
        <span>Product management</span>
      </NavLink>
      <NavLink
        to={ROUTER_PATH.roleManagement.path}
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
