import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../shared/NavBar/Navbar';
import Input from '../shared/InputFields/Input';
import '../../style/registration.scss';
import LiTag from '../shared/Buttons/LI-tag';
import Loader from '../shared/Loader/Loader';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginDetails: {},
    };
  }

  onInputChange = event => {
    const { loginDetails } = this.state;
    loginDetails[event.target.id] = event.target.value;
    this.setState({ loginDetails });
  };

  onButtonSubmit = async event => {
    event.preventDefault();
    const { loginDetails } = this.state;
    const { login } = this.props;
    login(loginDetails);
  };

  render() {
    const { loginDetails } = this.state;
    const { auth, isLoadingReducer } = this.props;
    const { redirect, isAdmin, isCitizen, isPolitician } = auth;
    const { loader } = isLoadingReducer;

    return (
      <React.Fragment>
        {loader && <Loader />}
        <NavBar>
          <LiTag to="/signup" value="Sign Up" />
        </NavBar>
        <div className="d-flex justify-content-center">
          <div className="inner">
            <div className="center">
              <i className="fa fa-balance-scale fa-5x " aria-hidden="true" />
              <h3 className="welcome__">Please login</h3>
            </div>
            <form
              className="signbox login"
              id="login-form"
              onSubmit={this.onButtonSubmit}
            >
              <Input
                type="text"
                placeholder="Email"
                id="email"
                value={loginDetails.email}
                onChange={this.onInputChange}
                required
              />
              <span id="spanemail" />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={loginDetails.password}
                onChange={this.onInputChange}
                required
              />
              <span id="spanpassword" />
              <Input
                id="submit"
                type="submit"
                name=""
                value="Login"
                className="submit"
              />
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
          </div>
        </div>
        {isAdmin && redirect && <Redirect to="/admin-dashboard" />}
        {isPolitician && redirect && <Redirect to="/politicians-dashboard" />}
        {isCitizen && redirect && <Redirect to="/citizens-dashboard" />}
      </React.Fragment>
    );
  }
}

export default Login;
