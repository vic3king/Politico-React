import React from 'react';
import Proptypes from 'prop-types';

const Input = ({ id, type, placeholder, value, ...rest }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    {...rest}
    required
  />
);

Input.defaultProps = {
  value: (Proptypes.defaultProps = ''),
  placeholder: (Proptypes.defaultProps = ''),
};

Input.propTypes = {
  id: Proptypes.string.isRequired,
  type: Proptypes.string.isRequired,
  placeholder: Proptypes.string,
  value: Proptypes.string,
};

export default Input;
