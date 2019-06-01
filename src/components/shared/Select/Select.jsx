import React from 'react';
import PropTypes from 'prop-types';

const Select = props => {
  const { onChange } = props;

  return (
    <select id="type" onChange={onChange}>
      <option disabled selected default>
        -- Select --
      </option>
      <option name="type" value="federal">
        federal
      </option>
      <option name="type" value="legislative">
        legislative
      </option>
      <option name="type" value="state">
        state
      </option>
      <option name="type" value="local-government">
        local-government
      </option>
    </select>
  );
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Select;
