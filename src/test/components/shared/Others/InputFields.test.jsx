import React from 'react';
import { shallow } from 'enzyme';

import Input from '../../../../components/shared/InputFields/Input';

describe('<Header />', () => {
  it('renders input', () => {
    const wrapper = shallow(
      <Input
        type="number"
        id="phonenumber"
        placeholder="Enter Phone number"
        value="Phonenumber"
        required="required"
      />
    );
    expect(wrapper.find('input'));
  });
});
