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
        <span className='title'>
          MBX
          <span className='sub-script'>WAREHOUSE</span>
        </span>
      </Logo>
      <div className='hamburger' onClick={toggleMenu}>
        <div className='line' />
        <div className='line' />
        <div className='line' />
      </div>
      {!!permission[1]?.status && (
        <NavLink
          to={ROUTER_PATH.overview.path}
          className='menu'
          activeClassName='active-menu'
          onClick={closeMenu}>
          <div className='menu-wrapper'>
            <OverviewIcon />
            <span className='menu-title'>Overview</span>
          </div>
        </NavLink>
      )}
      {!!permission[2]?.status && (
        <NavLink
          to={ROUTER_PATH.currentProductBalance.path}
          className='menu'
          activeClassName='active-menu'
          onClick={closeMenu}>
          <div className='menu-wrapper'>
            <ProductListIcon />
            <span className='menu-title'>Product list</span>
          </div>
        </NavLink>
      )}
      {!!permission[4]?.status && (
        <NavLink
          to={ROUTER_PATH.importExportMenu.path}
          className='menu'
          activeClassName='active-menu'
          onClick={closeMenu}>
          <div className='menu-wrapper'>
            <ImportExportProductIcon />
            <span className='menu-title'>Import - Export Product</span>
          </div>
        </NavLink>
      )}
      {!!permission[3]?.status && (
        <NavLink
          to={ROUTER_PATH.transaction.path}
          className='menu'
          activeClassName='active-menu'
          onClick={closeMenu}>
          <div className='menu-wrapper'>
            <HistoryIcon />
            <span className='menu-title'>Transaction</span>
          </div>
        </NavLink>
      )}
      {!!permission[0]?.status && (
        <NavLink
          to={ROUTER_PATH.map.path}
          className='menu'
          activeClassName='active-menu'
          onClick={closeMenu}>
          <div className='menu-wrapper'>
            <MapIcon />
            <span className='menu-title'>Map</span>
          </div>
        </NavLink>
      )}
      {(!!permission[6]?.status ||
        !!permission[7]?.status ||
        !!permission[5]?.status) && <span className='header-text'>ADMIN</span>}
      {!!permission[6]?.status && (
        <NavLink
          to={ROUTER_PATH.userManagement.path}
          className='menu'
          activeClassName='active-menu'
          onClick={closeMenu}>
          <div className='menu-wrapper'>
            <UserIcon />
            <span className='menu-title'>User management</span>
          </div>
        </NavLink>
      )}
      {!!permission[7]?.status && (
        <NavLink
          to={ROUTER_PATH.productManagement.path}
          className='menu'
          activeClassName='active-menu'
          onClick={closeMenu}>
          <div className='menu-wrapper'>
            <ProductIcon />
            <span className='menu-title'>Product management</span>
          </div>
        </NavLink>
      )}
      {!!permission[5]?.status && (
        <NavLink
          to={ROUTER_PATH.roleManagement.path}
          className='menu'
          activeClassName='active-menu'
          onClick={closeMenu}>
          <div className='menu-wrapper'>
            <PermissionIcon />
            <span className='menu-title'>Role management</span>
          </div>
        </NavLink>
      )}
    </SideBar>
  )
}

export default NavBar
