import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import WelcomePage from './components/WelcomePage'

import './App.sass';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Switch> 
              <Route path="/welcome" component={WelcomePage} />        
              <Route path="/login" component={Login} />

              <Route component={WelcomePage} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
