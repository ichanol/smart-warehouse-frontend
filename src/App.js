import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { Login, Menu, ImportExportProduct, EditProduct, NewMenu } from './pages'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/menu' component={Menu} />
        <Route path='/import-export' component={ImportExportProduct} />
        <Route path='/edit-product' component={EditProduct} />
        <Route path='/n' component={NewMenu} />
      </Switch>
    </Router>
  )
}

export default App
