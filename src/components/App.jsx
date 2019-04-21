import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ErrorPage from './NotFound-404/pagenotfound';
import HomePage from './Home/Home';
import Signup from './Registration/Signup';
import Login from './Registration/Login';

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/error" component={ErrorPage} />
          <Route path="*" component={ErrorPage} />
          <Redirect to="/error" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
