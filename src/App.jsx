import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import WelcomePage from './components/WelcomePage'
import Header from './components/Header'
import isAuthenticated from './components/Auth/requiresAuth';

import './App.sass';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Switch> 
              <Route path="/welcome" component={WelcomePage} />        
              <Route path="/login" component={Login} />
              <Route path="/home" component={isAuthenticated(Header)} />

              <Route component={WelcomePage} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
