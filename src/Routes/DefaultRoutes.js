import {
  EditImportExportProduct,
  ImportExportMenu,
  ImportExportProduct,
  Map,
  Overview,
  ProductList,
  ProductManagement,
  ProfileSettings,
  RoleManagement,
  Transaction,
  UserManagement,
} from '../Pages'

import NavBar from '../components/NavBar/NavBar'
import PrivateRoute from './PrivateRoute'
import { ROUTER_PATH } from '../Constant'
import React from 'react'
import RedirectNotFound from './RedirectNotFound'
import { Switch } from 'react-router-dom'
import Toast from '../components/Toast/Toast'
import TopPanel from '../components/TopPanel/TopPanel'

const DefaultRoutes = () => {

  return (
    <div className='wrapper'>
      <NavBar />
      <div className='app-content'>
        <TopPanel />
        <Toast />
        <Switch>
          <PrivateRoute
            path={ROUTER_PATH.notInNavBar.userSettings}
            component={ProfileSettings}
          />
          <PrivateRoute
            path={ROUTER_PATH.notInNavBar.editImportExportProduct}
            component={EditImportExportProduct}
          />
          <PrivateRoute
            path={ROUTER_PATH.notInNavBar.scanForProduct}
            component={ImportExportProduct}
          />
          <PrivateRoute
            path={ROUTER_PATH.navBar.importExportMenu.path}
            component={ImportExportMenu}
          />
          <PrivateRoute path={ROUTER_PATH.navBar.map.path} component={Map} />
          <PrivateRoute
            path={ROUTER_PATH.navBar.overview.path}
            component={Overview}
          />
          <PrivateRoute
            path={ROUTER_PATH.navBar.currentProductBalance.path}
            component={ProductList}
          />
          <PrivateRoute
            path={ROUTER_PATH.navBar.productManagement.path}
            component={ProductManagement}
          />
          <PrivateRoute
            path={ROUTER_PATH.navBar.roleManagement.path}
            component={RoleManagement}
          />
          <PrivateRoute
            path={ROUTER_PATH.navBar.transaction.path}
            component={Transaction}
          />
          <PrivateRoute
            path={ROUTER_PATH.navBar.userManagement.path}
            component={UserManagement}
          />
          <PrivateRoute component={RedirectNotFound} />
        </Switch>
      </div>
    </div>
  )
}

export default DefaultRoutes
