import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import WelcomePage from './components/WelcomePage'
import Header from './components/Header'
import Home from './components/Home'
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
              <Route path="/home" component={Home} />

              <Route component={WelcomePage} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
