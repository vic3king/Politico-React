import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../../../components/Registration/Login';

describe('Login component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a form tag', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('form'));
    expect(wrapper.hasClass('signbox2'));
  });
});
