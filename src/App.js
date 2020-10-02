import React from 'react'
import { RecoilRoot, useRecoilTransactionObserver_UNSTABLE } from 'recoil'
import atomState from './Atoms/Atoms'
import PrivateRoute from './components/Routes/PrivateRoute'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom'
import './App.css'
import {
  Login,
  Menu,
} from './pages'

import {
  ImportExportProduct,
  Map,
  Overview,
  ProductList,
  ProductManagement,
  RoleManagement,
  Transaction,
  UserManagement,
  NotFound,
  ProfileSettings,
  EditImportExportProduct,
  ImportExportMenu,
} from './components/newPages'

import NavBar from './components/newComponents/NavBar'
import Toast from './components/newComponents/Toast/Toast'
import { Modal } from './components/Modal'

const App = () => {
  const PersistenceObserver = () => {
    useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
      for (const modifiedAtom of snapshot.getNodes_UNSTABLE({
        isModified: true,
      })) {
        const atomLoadable = snapshot.getLoadable(modifiedAtom)
        if (atomLoadable.state === 'hasValue') {
          window.localStorage.setItem(
            modifiedAtom.key,
            JSON.stringify({ value: atomLoadable.contents }),
          )
        }
      }
    })
    return null
  }

  const atomSearcher = (atom) => {
    const arr = Object.entries(atomState)
    let atomObj
    arr.map((value, key) => {
      if (value[0] === atom) {
        atomObj = value[1]
      }
    })
    return atomObj
  }

  const initializeState = ({ set }) => {
    for (const [key, value] of Object.entries(window.localStorage)) {
      set(atomSearcher(key), JSON.parse(value).value)
    }
  }

  const RedirectNotFound = () => {
    return <Redirect to='/not-found' />
  }

  const DefaultRoutes = () => {
    const history = useHistory()
    return (
      <div className='wrapper'>
        <NavBar />
        <div className='content'>
          <Toast />
          <div className='top-panel'>
            <div className='profile' onClick={() => history.push('/settings')}>
              <div className='thumbnail' />
              <span>USERNAME</span>
            </div>
          </div>

          <Switch>
            <PrivateRoute path='/menu' component={Menu} />
            <PrivateRoute path='/import-export/edit-product/:productid' component={EditImportExportProduct} />
            <PrivateRoute path='/import-export/in-progress' component={ImportExportProduct} />
            <PrivateRoute path='/import-export' component={ImportExportMenu} />
            <PrivateRoute path='/map' component={Map} />
            <PrivateRoute path='/overview' component={Overview} />
            <PrivateRoute path='/product-list' component={ProductList} />
            <PrivateRoute path='/product-management' component={ProductManagement} />
            <PrivateRoute path='/role-management' component={RoleManagement} />
            <PrivateRoute path='/transaction' component={Transaction} />
            <PrivateRoute path='/user-management' component={UserManagement} />
            <PrivateRoute path='/settings' component={ProfileSettings} />
            <PrivateRoute component={RedirectNotFound} />
          </Switch>
        </div>
      </div>
    )
  }

  return (
    <div className='app'>
      <RecoilRoot initializeState={initializeState}>
        <PersistenceObserver />
        <Modal />
        <Router>
          <Switch>
            <Route path='/' component={Login} exact />
            <Route path='/not-found' component={NotFound} />
            <Route component={DefaultRoutes} />
          </Switch>
        </Router>
      </RecoilRoot>
    </div>
  )
}

export default App
