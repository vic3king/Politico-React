import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ErrorPage from './NotFound-404/Pagenotfound';
import HomePage from './Home/Home';
import Signup from './Registration/Signup';
import Login from './Registration/Login';
import AdminPage from './Dashboard/Admin/Admin';
import PoliticiansPage from './Dashboard/Politicians/Politicians';
import ResultsPage from './Results/ResultsPage';
import Logout from './Logout/Logout';
import CitizensPage from './Dashboard/Citizens/Citizens';
import CandidateIntrestRequestList from './CandidateIntrestRequests/CandidateIntrestRequestList';

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
            <Route path="/politicians-dashboard" component={PoliticiansPage} />
            <Route path="/citizens-dashboard" component={CitizensPage} />
            <Route path="/results" component={ResultsPage} />
            <Route
              path="/requests"
              exact
              component={CandidateIntrestRequestList}
            />
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
