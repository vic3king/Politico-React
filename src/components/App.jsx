import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Notifications from 'react-notify-toast';
import ErrorPage from './NotFound-404/Pagenotfound';
import HomePage from './Home/Home';
import Signup from './Registration/Signup';
import Login from './Registration/Login';
import AdminPage from './Dashboard/Admin/Admin';
import PoliticiansPage from './Dashboard/Politicians/Politicians';
import Logout from './Logout/Logout';
import CitizensPage from './Dashboard/Citizens/Citizens';

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Notifications />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/admin-dashboard" component={AdminPage} />
            <Route path="/politicians-dashboard" component={PoliticiansPage} />
            <Route path="/citizens-dashboard" component={CitizensPage} />
            <Route path="/logout" component={Logout} />
            <Route path="/error" component={ErrorPage} />
            <Route path="*" component={ErrorPage} />
            <Redirect to="/error" />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
