/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import '../../../style/navbar.scss';
import PropTypes from 'prop-types';

const NavBar = ({ LiTagOne, LiTagTwo }) => {
  return (
    <React.Fragment>
      <header className="main-header">
        <div>
          <i className="fa fa-balance-scale fa-lg" />
          <Link to="/" className="main-header__brand">
            Politico
          </Link>
        </div>
        <nav className="main-nav">
          <ul className="main-nav__items">
            {LiTagOne}
            {LiTagTwo}
          </ul>
        </nav>
      </header>
    </React.Fragment>
  );
};
NavBar.defaultProps = {
  LiTagOne: (PropTypes.defaultProps = ''),
  LiTagTwo: (PropTypes.defaultProps = ''),
};
NavBar.propTypes = {
  LiTagOne: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  LiTagTwo: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default NavBar;
