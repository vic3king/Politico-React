import React from 'react';
import { shallow } from 'enzyme';
import Signup from '../../../../components/Registration/Signup';

describe('SignUp component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a form tag', () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper.find('form'));
    expect(wrapper.hasClass('signbox'));
  });
});
