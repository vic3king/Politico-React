import React from 'react';
import { shallow } from 'enzyme';
import Logout from '../../../components/Logout/Logout';

describe('Logout component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Logout />);
    expect(wrapper).toMatchSnapshot();
  });

  // it('should render a form tag', () => {
  //   const wrapper = shallow(<Logout />);
  //   expect(wrapper.find('form'));
  //   expect(wrapper.hasClass('signbox2'));
  // });
});
