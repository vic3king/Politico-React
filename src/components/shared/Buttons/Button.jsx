import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ value, id, className, onClick }) => {
  return (
    <button type="button" id={id} className={className} onClick={onClick}>
      {value}
    </button>
  );
};

Button.defaultProps = {
  className: (PropTypes.defaultProps = ''),
  onClick: PropTypes.func,
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
