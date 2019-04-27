import React from 'react';
import PropTypes from 'prop-types';

const Select = () => {
  return (
    <select id="selecttype">
      <option value="federal" id="citizen">
        federal
      </option>
      <option value="legislative" id="politician">
        legislative
      </option>
      <option value="state" id="state">
        state
      </option>
      <option value="local-government" id="politician">
        local-government
      </option>
    </select>
  );
};

Select.prototypec = {
  text: PropTypes.string.isRequired,
};
export default Select;
