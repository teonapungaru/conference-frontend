import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import WelcomePage from './components/WelcomePage'
import AddConference from './components/AddConference'
import isAuthenticated from './components/Auth/requiresAuth';

import './App.sass';

class App extends Component {
  render() {
    return (
        <Router>
            <Switch> 
              <Route path="/welcome" component={isAuthenticated(WelcomePage)} />        
              <Route path="/login" component={Login} />
              <Route path="/addConf" component={isAuthenticated(AddConference)} />
             
              <Route component={isAuthenticated(WelcomePage)} />
              
            </Switch>
        </Router>
    );
  }
}

export default App;
