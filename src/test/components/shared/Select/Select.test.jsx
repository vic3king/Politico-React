import React from 'react';
import { shallow } from 'enzyme';
import Select from '../../../../components/shared/Select/Select';

describe('ProfileDetails component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Select />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a option tag', () => {
    const wrapper = shallow(<Select />);
    expect(wrapper.find('option'));
  });
});
