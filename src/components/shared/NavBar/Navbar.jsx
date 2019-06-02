import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import { Link, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import '../../../style/navbar.scss';
import toggleSidebar from '../../../helpers/responsive';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      expired: false,
    };
  }

  checkToken = () => {
    const { token } = this.state;
    if (token) {
      const data = jwt.decode(token);
      if (!data) {
        localStorage.clear();
        this.setState({ expired: true, token: null });
      }

      const currentTime = new Date().getTime() / 1000;
      if (currentTime > data.exp) {
        localStorage.clear();
        this.setState({ expired: true, token: null });
      }
    }
  };

  componentDidMount = () => {
    const { token } = localStorage;
    if (!token) {
      this.setState({ token: null });
    } else {
      this.setState({ token, expired: false });
    }
  };

  componentDidUpdate = () => {
    this.checkToken();
    if (!window.navigator.onLine) {
      notify.show('Please check your internet connection', -1);
    } else {
      this.checkToken();
    }
  };

  render() {
    const { expired } = this.state;
    const { show, children } = this.props;
    return (
      <React.Fragment>
        <header className="main-header">
          {expired && <Redirect to="/login" />}
          {show && (
            <div className="hide-lg">
              <button type="button" onClick={() => toggleSidebar()}>
                <i className="fa fa-bars fa-3x" />
              </button>
            </div>
          )}
          <div>
            <i className="fa fa-balance-scale fa-lg" />
            <Link to="/" className="main-header__brand">
              Politico
            </Link>
          </div>
          <nav className="main-nav">
            <ul className="main-nav__items">{children && children}</ul>
          </nav>
        </header>
      </React.Fragment>
    );
  }
}
export default NavBar;
