import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Notifications from 'react-notify-toast';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import store from './store/store';
import ErrorPage from './components/NotFound-404/Pagenotfound';
import HomePage from './components/Home/Home';
import Signup from './components/Registration/Signup';
import Login from './container/login.container';
import Logout from './components/Logout/Logout';
import CitizensPage from './container/citizens-page.container';
import AdminPage from './container/admin-page.container';
import PoliticiansPage from './container/politicians-page.container';

class App extends Component {
  state = {};

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Notifications />
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/admin-dashboard" component={AdminPage} />
              <Route
                path="/politicians-dashboard"
                component={PoliticiansPage}
              />
              <Route path="/citizens-dashboard" component={CitizensPage} />
              <Route path="/logout" component={Logout} />
              <Route path="/error" component={ErrorPage} />
              <Route path="*" component={ErrorPage} />
              <Redirect to="/error" />
            </Switch>
          </BrowserRouter>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
