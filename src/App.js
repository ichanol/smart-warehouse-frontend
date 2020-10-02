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
  /* , ImportExportProduct */
  EditProduct,
  NewMenu,
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
} from './components/newPages'

import NavBar from './components/newComponents/NavBar'

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
    let x
    arr.map((value, key) => {
      if (value[0] === atom) {
        x = value[1]
      }
    })
    return x
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
          <div className='top-panel'>
            <div className='profile' onClick={() => history.push('/settings')}>
              <div className='thumbnail' />
              <span>USERNAME</span>
            </div>
          </div>
          <Switch>
            <Route path='/menu' component={Menu} />
            <Route path='/edit-product' component={EditProduct} />
            <Route path='/import-export' component={ImportExportProduct} />
            <Route path='/map' component={Map} />
            <Route path='/overview' component={Overview} />
            <Route path='/product-list' component={ProductList} />
            <Route path='/product-management' component={ProductManagement} />
            <Route path='/role-management' component={RoleManagement} />
            <Route path='/transaction' component={Transaction} />
            <Route path='/user-management' component={UserManagement} />
            <Route path='/settings' component={ProfileSettings} />
            <Route component={RedirectNotFound} />
          </Switch>
        </div>
      </div>
    )
  }

  return (
    <div className='app'>
      <RecoilRoot initializeState={initializeState}>
        <PersistenceObserver />
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
