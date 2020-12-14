import {
  CreateProduct,
  CreateRole,
  CreateUser,
  EditImportExportProduct,
  EditProduct,
  EditRole,
  EditTransaction,
  EditUser,
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
            key={ROUTER_PATH.userSettings.path}
            component={ProfileSettings}
            routePermission='public'
          />
          <PrivateRoute
            path={ROUTER_PATH.editImportExportProduct.path}
            key={ROUTER_PATH.editImportExportProduct.path}
            component={EditImportExportProduct}
            routePermission='Import Export Product'
          />
          <PrivateRoute
            path={ROUTER_PATH.importExportMenu.path}
            key={ROUTER_PATH.importExportMenu.path}
            component={ImportExportProduct}
            routePermission='Import Export Product'
          />
          <PrivateRoute
            path={ROUTER_PATH.map.path}
            key={ROUTER_PATH.map.path}
            component={Map}
            routePermission='Map'
          />
          <PrivateRoute
            path={ROUTER_PATH.overview.path}
            key={ROUTER_PATH.overview.path}
            component={Overview}
            routePermission='Overview'
          />
          <PrivateRoute
            path={ROUTER_PATH.currentProductBalance.path}
            key={ROUTER_PATH.currentProductBalance.path}
            component={ProductList}
            routePermission='Product List'
          />
          <PrivateRoute
            path={ROUTER_PATH.createProduct.path}
            key={ROUTER_PATH.createProduct.path}
            component={CreateProduct}
            routePermission='Product Management'
          />
          <PrivateRoute
            path={ROUTER_PATH.editProduct.path}
            key={ROUTER_PATH.editProduct.path}
            component={EditProduct}
            routePermission='Product Management'
          />
          <PrivateRoute
            path={ROUTER_PATH.productManagement.path}
            key={ROUTER_PATH.productManagement.path}
            component={ProductManagement}
            routePermission='Product Management'
          />
          <PrivateRoute
            path={ROUTER_PATH.createRole.path}
            key={ROUTER_PATH.createRole.path}
            component={CreateRole}
            routePermission='Role Management'
          />
          <PrivateRoute
            path={ROUTER_PATH.editRole.path}
            key={ROUTER_PATH.editRole.path}
            component={EditRole}
            routePermission='Role Management'
          />
          <PrivateRoute
            path={ROUTER_PATH.roleManagement.path}
            key={ROUTER_PATH.roleManagement.path}
            component={RoleManagement}
            routePermission='Role Management'
          />
          <PrivateRoute
            path={ROUTER_PATH.createUser.path}
            key={ROUTER_PATH.createUser.path}
            component={CreateUser}
            routePermission='User Management'
          />
          <PrivateRoute
            path={ROUTER_PATH.editUser.path}
            key={ROUTER_PATH.editUser.path}
            component={EditUser}
            routePermission='User Management'
          />
          <PrivateRoute
            path={ROUTER_PATH.userManagement.path}
            key={ROUTER_PATH.userManagement.path}
            component={UserManagement}
            routePermission='User Management'
          />
          <PrivateRoute
            path={ROUTER_PATH.editTransaction.path}
            key={ROUTER_PATH.editTransaction.path}
            component={EditTransaction}
            routePermission='Transaction'
          />
          <PrivateRoute
            path={ROUTER_PATH.transaction.path}
            key={ROUTER_PATH.transaction.path}
            component={Transaction}
            routePermission='Transaction'
          />
          <PrivateRoute
            component={RedirectNotFound}
            routePermission='public'
          />
        </Switch>
      </div>
    </div>
  )
}

export default DefaultRoutes
