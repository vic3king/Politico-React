import React from 'react';
import { shallow } from 'enzyme';
import ErrorPage from '../../../components/NotFound-404/pagenotfound';

describe('HomePage component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<ErrorPage />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('img'));
    expect(wrapper.find('section'));
    expect(wrapper.find('div'));
  });
});
