import React from 'react';
import '../../../style/navbar.scss';

const NavBar = () => {
  return (
    <React.Fragment>
      <header className="main-header">
        <div>
          <i className="fa fa-balance-scale fa-lg" />
          <a href="index.html" className="main-header__brand">
            Politico
          </a>
        </div>
        <nav className="main-nav">
          <ul className="main-nav__items">
            <li className="main-nav__item">
              <a href="signup.html">Sign Up</a>
            </li>
            <li className="main-nav__item">
              <a href="login.html">Login</a>
            </li>
          </ul>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default NavBar;
