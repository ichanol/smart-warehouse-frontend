import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { Login, ImportExportProduct } from './pages'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/import-export' component={ImportExportProduct} />
      </Switch>
    </Router>
  )
}

export default App
