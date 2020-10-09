import { GlobalStyle, atomSearcher, blacklistSearcher } from './Utils'
import { Login, NotFound } from './Pages'
import {
  RecoilRoot,
  useRecoilTransactionObserver_UNSTABLE as recoilObserver,
} from 'recoil'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import DefaultRoutes from './Routes/DefaultRoutes'
import { Modal } from './components/Modal'
import { ROUTER_PATH } from './Constant'
import React from 'react'

const App = () => {
  const PersistenceObserver = () => {
    recoilObserver(({ snapshot }) => {
      for (const modifiedAtom of snapshot.getNodes_UNSTABLE({
        isModified: true,
      })) {
        const atomLoadable = snapshot.getLoadable(modifiedAtom)
        const isBlackList = blacklistSearcher(modifiedAtom.key)
        if (isBlackList || atomLoadable.state !== 'hasValue') {
          return false
        }
        window.localStorage.setItem(
          modifiedAtom.key,
          JSON.stringify({ value: atomLoadable.contents }),
        )
      }
    })
    return null
  }

  const initializeState = ({ set }) => {
    for (const [key, value] of Object.entries(window.localStorage)) {
      set(atomSearcher(key), JSON.parse(value).value)
    }
  }

  return (
    <RecoilRoot initializeState={initializeState}>
      <GlobalStyle />
      <PersistenceObserver />
      <div className='app'>
        <Modal />
        <Router>
          <Switch>
            <Route path={ROUTER_PATH.login.path} component={Login} exact />
            <Route path={ROUTER_PATH.notFound.path} component={NotFound} />
            <Route component={DefaultRoutes} />
          </Switch>
        </Router>
      </div>
    </RecoilRoot>
  )
}

export default App
