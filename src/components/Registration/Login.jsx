import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../shared/NavBar/Navbar';
import Input from '../shared/InputFields/Input';
import '../../style/registration.scss';
import LiTag from '../shared/Buttons/LI-tag';

class Login extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <NavBar LiTagOne={<LiTag to="/signup" value="Sign Up" />} />
        <div className="center" />
        <form className="signbox2" id="login-form">
          <span id="spanuser" />
          <Input type="text" placeholder="Email" id="email" required />
          <span id="spanemail" />
          <Input
            id="password"
            type="password"
            placeholder="Password"
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
      </React.Fragment>
    );
  }
}

export default Login;
