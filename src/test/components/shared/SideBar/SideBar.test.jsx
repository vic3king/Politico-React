import React from 'react';
import { shallow } from 'enzyme';
import SideBar from '../../../../components/shared/SideBar/SideBar';

describe('SideBar component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<SideBar />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a div tag', () => {
    const wrapper = shallow(<SideBar />);
    expect(wrapper.find('div'));
  });
});
