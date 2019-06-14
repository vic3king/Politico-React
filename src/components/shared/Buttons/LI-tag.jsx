import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LiTag = ({ to, value }) => {
  return (
    <li className="main-nav__item">
      <Link to={to}>{value}</Link>
    </li>
  );
};

LiTag.propTypes = {
  value: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default LiTag;
