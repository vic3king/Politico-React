import React from 'react';
import PropTypes from 'prop-types';

const Span = ({ text }) => {
  return <span>{text}</span>;
};

Span.prototypec = {
  text: PropTypes.string.isRequired,
};
export default Span;
