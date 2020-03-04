import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import WelcomePage from './components/WelcomePage'
import Header from './components/Header'
import Home from './components/Home'
import Authors from './components/Authors'
import AddConference from './components/AddConference'
import isAuthenticated from './components/Auth/requiresAuth';
import clicked from './config/clickedComponent'

import './App.sass';

class App extends Component {
  render() {
    return (
        <Router>
            <Switch> 
              <Route path="/welcome" component={WelcomePage} />        
              <Route path="/login" component={Login} />
              <Route path="/addConf" component={AddConference} />
              <Route path="/" component={clicked(Header)} />
             
              <Route component={WelcomePage} />
              
            </Switch>
        </Router>
    );
  }
}

export default App;
