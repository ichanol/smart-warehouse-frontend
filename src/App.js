import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { RecoilRoot, useRecoilTransactionObserver_UNSTABLE } from 'recoil'
import './App.css'
import { Login, Menu, ImportExportProduct, EditProduct } from './pages'
import atomState from './Atoms/Atoms'
import PrivateRoute from './components/Routes/PrivateRoute'

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

  return (
    <RecoilRoot initializeState={initializeState}>
      <PersistenceObserver />
      <Router>
        <Switch>
          <Route path='/' exact component={Login} />
          <PrivateRoute path='/menu' component={Menu} />
          <PrivateRoute path='/import-export' component={ImportExportProduct} />
          <PrivateRoute path='/edit-product' component={EditProduct} />
        </Switch>
      </Router>
    </RecoilRoot>
  )
}

export default App
