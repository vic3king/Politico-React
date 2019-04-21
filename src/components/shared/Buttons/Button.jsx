import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ value, id }) => {
  return (
    <button type="button" id={id}>
      {value}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Button;
