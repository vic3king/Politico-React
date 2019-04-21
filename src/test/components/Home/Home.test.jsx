import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../../../components/Home/Home';

describe('HomePage component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('section'));
    expect(wrapper.find('div'));
    expect(wrapper.find('img'));
  });
});
