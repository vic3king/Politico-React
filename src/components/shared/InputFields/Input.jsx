import React from 'react';
import Proptypes from 'prop-types';

const Input = ({ id, type, placeholder, value, onChange }) => (
  <input id={id} type={type} placeholder={placeholder} value={value} required />
);

Input.defaultProps = {
  value: (Proptypes.defaultProps = ''),
  placeholder: (Proptypes.defaultProps = ''),
  onChange: (Proptypes.defaultProps = () => console.log('testt')),
};

Input.propTypes = {
  id: Proptypes.string.isRequired,
  type: Proptypes.string.isRequired,
  placeholder: Proptypes.string,
  value: Proptypes.string,
  onChange: Proptypes.func,
};

export default Input;
