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
import { NavBar, Toast, TopPanel } from '../components'

import PrivateRoute from './PrivateRoute'
import { ROUTER_PATH } from '../Constant'
import React from 'react'
import RedirectNotFound from './RedirectNotFound'
import { Switch } from 'react-router-dom'

const DefaultRoutes = () => {
  return (
    <div className='wrapper'>
      <NavBar />
      <div className='app-content'>
        <TopPanel />
        <Toast />
        <Switch>
          <PrivateRoute
            path={ROUTER_PATH.userSettings.path}
            component={ProfileSettings}
          />
          <PrivateRoute
            path={ROUTER_PATH.editImportExportProduct.path}
            component={EditImportExportProduct}
          />
          <PrivateRoute
            path={ROUTER_PATH.scanForProduct.path}
            component={ImportExportProduct}
          />
          <PrivateRoute
            path={ROUTER_PATH.importExportMenu.path}
            component={ImportExportMenu}
          />
          <PrivateRoute path={ROUTER_PATH.map.path} component={Map} />
          <PrivateRoute path={ROUTER_PATH.overview.path} component={Overview} />
          <PrivateRoute
            path={ROUTER_PATH.currentProductBalance.path}
            component={ProductList}
          />
          <PrivateRoute
            path={ROUTER_PATH.productManagement.path}
            component={ProductManagement}
          />
          <PrivateRoute
            path={ROUTER_PATH.roleManagement.path}
            component={RoleManagement}
          />
          <PrivateRoute
            path={ROUTER_PATH.transaction.path}
            component={Transaction}
          />
          <PrivateRoute
            path={ROUTER_PATH.userManagement.path}
            component={UserManagement}
          />
          <PrivateRoute component={RedirectNotFound} />
        </Switch>
      </div>
    </div>
  )
}

export default DefaultRoutes
