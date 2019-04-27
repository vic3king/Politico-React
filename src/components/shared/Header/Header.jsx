import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ text }) => {
  return <h3 className="page-modal-title">{text}</h3>;
};

Header.prototypec = {
  text: PropTypes.string.isRequired,
};
export default Header;
