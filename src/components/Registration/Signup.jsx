import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../shared/NavBar/Navbar';
import Input from '../shared/InputFields/Input';
import '../../style/registration.scss';
import LiTag from '../shared/Buttons/LI-tag';

class Signup extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <NavBar LiTagTwo={<LiTag to="/login" value="Login" />} />
        <div className="center" />
        <form
          className="signbox"
          id="signup-form"
          style={{ marginTop: '56px' }}
        >
          <span id="usergen" />
          <div className="wholeform">
            <div className="formgroup">
              <Input
                id="firstname"
                type="text"
                placeholder="First name"
                required="required"
              />
              <span id="spanfirstname" />
            </div>
            <div className="formgroup">
              <Input
                id="lastname"
                type="text"
                placeholder="Last name"
                required="required"
              />
              <span id="spanlastname" />
            </div>
          </div>

          <div className="wholeform">
            <div className="formgroup">
              <Input
                id="othernames"
                type="text"
                placeholder="Othernames"
                required="required"
              />
              <span id="spanothernames" />
            </div>
            <div className="formgroup">
              <Input
                id="phonenumber"
                type="text"
                placeholder="PhoneNumber"
                required="required"
              />
              <span id="phone" />
            </div>
          </div>
          <div className="wholeform">
            <div className="formgroup">
              <Input
                id="email"
                type="email"
                placeholder="Please enter email"
                required="required"
              />
              <span id="vemail" />
            </div>
            <div className="formgroup">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                required="required"
              />
              <span id="spanpass" />
            </div>
          </div>
          <select id="selecttype">
            <option value="citizen" id="citizen">
              Citizen
            </option>
            <option value="politician" id="politician">
              Poitician
            </option>
          </select>
          <div className="formgroup submit">
            <Input id="submit-btn" type="submit" value="Sign Up" />
          </div>
          <p style={{ textAlign: 'center' }}>
            Already have an account?
            <Link className="link" to="/login">
              Login
            </Link>
          </p>
        </form>
      </React.Fragment>
    );
  }
}

export default Signup;
