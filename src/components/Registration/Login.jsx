import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../shared/NavBar/Navbar';
import Input from '../shared/InputFields/Input';
import '../../style/registration.scss';
import LiTag from '../shared/Buttons/LI-tag';
import Loader from '../shared/Loader/Loader';
import authServices from '../../services/authentication.services';
import errorHandler from '../../helpers/errorHandler';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginDetatils: {},
      loading: false,
      canRedirect: false,
      isAdmin: false,
      isPolitician: false,
      isCitizen: false,
    };
  }

  onInputChange = event => {
    const { loginDetatils } = this.state;
    loginDetatils[event.target.id] = event.target.value;
    this.setState({ loginDetatils });
  };

  onButtonSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { loginDetatils } = this.state;
    const user = await authServices.auth('login', loginDetatils);

    if (user.status >= 400) {
      this.setState({ loading: false });
      notify.show(errorHandler(user.error), 'error');
    }

    if (user.status === 200) {
      this.setState({ loading: true });
      if (user.data[0].user.type === 'admin') {
        this.setState({ isAdmin: true });
      }
      if (user.data[0].user.type === 'politician') {
        this.setState({ isPolitician: true });
      }
      if (user.data[0].user.type === 'citizen') {
        this.setState({ isCitizen: true });
      }
      localStorage.setItem('token', user.data[0].token);
      localStorage.setItem('user', JSON.stringify(user.data[0].user));
      this.setState({ canRedirect: true });
    }
  };

  render() {
    const {
      loginDetatils,
      loading,
      canRedirect,
      isAdmin,
      isCitizen,
      isPolitician,
    } = this.state;

    return (
      <React.Fragment>
        {loading && <Loader />}
        <Notifications />
        <NavBar LiTagOne={<LiTag to="/signup" value="Sign Up" />} />
        <div className="center">
          <i className="fa fa-balance-scale fa-5x " aria-hidden="true" />
          <h3 className="welcome__">Please login</h3>
        </div>
        <div className="center" />
        <form
          className="signbox2"
          id="login-form"
          onSubmit={this.onButtonSubmit}
        >
          <Input
            type="text"
            placeholder="Email"
            id="email"
            value={loginDetatils.email}
            onChange={this.onInputChange}
            required
          />
          <span id="spanemail" />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={loginDetatils.password}
            onChange={this.onInputChange}
            required
          />
          <span id="spanpassword" />
          <Input id="submit" type="submit" name="" value="Login" />
          <Link to="/reset" className="link">
            Forgotten your password?
          </Link>
          <p style={{ textAlign: 'center' }}>
            Need an account?
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </p>
        </form>
        {isAdmin && canRedirect && <Redirect to="/admin-dashboard" />}
        {isPolitician && canRedirect && (
          <Redirect to="/politicians-dashboard" />
        )}
        {isCitizen && canRedirect && <Redirect to="/citizens-dashboard" />}
      </React.Fragment>
    );
  }
}

export default Login;
