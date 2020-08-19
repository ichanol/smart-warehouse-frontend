import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css';

import Login from './pages/login'
import IEProduct from './pages/Import-Export';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/IEProduct' component={IEProduct} />
      </Switch>
    </Router>
  );
}

export default App;
