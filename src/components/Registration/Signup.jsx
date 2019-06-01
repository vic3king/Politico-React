import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../shared/NavBar/Navbar';
import Input from '../shared/InputFields/Input';
import '../../style/registration.scss';
import LiTag from '../shared/Buttons/LI-tag';
import Loader from '../shared/Loader/Loader';
import authServices from '../../services/authentication.services';
import errorHandler from '../../helpers/errorHandler';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpDetatils: { type: 'citizen' },
      loading: false,
      canRedirect: false,
    };
  }

  onInputChange = event => {
    const { signUpDetatils } = this.state;
    signUpDetatils[event.target.id] = event.target.value;
    this.setState({ signUpDetatils });
  };

  onButtonSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { signUpDetatils } = this.state;
    const user = await authServices.auth('signup', signUpDetatils);

    if (user.status >= 400) {
      this.setState({ loading: false });
      notify.show(errorHandler(user.error.message[0].error), 'error');
    }

    if (user.status === 201) {
      this.setState({ loading: true });
      localStorage.setItem('token', user.data[0].token);
      localStorage.setItem('user', JSON.stringify(user.data[0].user));
      this.setState({ canRedirect: true });
    }
  };

  render() {
    const { signUpDetatils, loading, canRedirect } = this.state;
    return (
      <React.Fragment>
        {loading && <Loader />}
        <NavBar>
          <LiTag to="/login" value="Login" />
        </NavBar>
        <div className="d-flex justify-content-center">
          <div className="inner">
            <div className="center">
              <i className="fa fa-balance-scale fa-5x " aria-hidden="true" />
              <h3 className="welcome__">Please Signup</h3>
            </div>
            <form
              className="signbox"
              id="signup-form"
              style={{ marginTop: '20px' }}
              onSubmit={this.onButtonSubmit}
            >
              <div className="wholeform">
                <div className="formgroup">
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="First name"
                    value={signUpDetatils.firstname}
                    onChange={this.onInputChange}
                  />
                </div>
                <div className="formgroup">
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Last name"
                    value={signUpDetatils.lastname}
                    onChange={this.onInputChange}
                  />
                </div>
              </div>

              <div className="wholeform">
                <div className="formgroup">
                  <Input
                    id="othernames"
                    type="text"
                    placeholder="Othernames"
                    value={signUpDetatils.othernames}
                    onChange={this.onInputChange}
                  />
                </div>
                <div className="formgroup">
                  <Input
                    id="phonenumber"
                    type="text"
                    placeholder="PhoneNumber"
                    value={signUpDetatils.phonenumber}
                    onChange={this.onInputChange}
                  />
                </div>
              </div>
              <div className="wholeform">
                <div className="formgroup">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Please enter email"
                    value={signUpDetatils.email}
                    onChange={this.onInputChange}
                  />
                </div>
                <div className="formgroup">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={signUpDetatils.password}
                    onChange={this.onInputChange}
                  />
                </div>
              </div>
              <select
                id="type"
                className="select-type"
                onChange={this.onInputChange}
              >
                <option name="type" value="citizen">
                  Citizen
                </option>
                <option name="type" value="politician">
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
          </div>
        </div>
        {canRedirect && <Redirect to="/login" />}
      </React.Fragment>
    );
  }
}

export default Signup;
