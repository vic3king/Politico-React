import React from 'react';
import { Link } from 'react-router-dom';
import '../../../style/navbar.scss';
import toggleSidebar from '../../../helpers/responsive';

const NavBar = ({ show, children }) => {
  return (
    <React.Fragment>
      <header className="main-header">
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
};
export default NavBar;
