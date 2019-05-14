import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ErrorPage from './NotFound-404/Pagenotfound';
import HomePage from './Home/Home';
import Signup from './Registration/Signup';
import Login from './Registration/Login';
import AdminPage from './Dashboard/Admin/Admin';
import ResultsPage from './Results/ResultsPage';

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/admin-dashboard" component={AdminPage} />
            <Route path="/results" component={ResultsPage} />
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
