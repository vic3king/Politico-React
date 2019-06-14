import React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../../../../components/shared/NavBar/Navbar';
import LiTag from '../../../../components/shared/Buttons/LI-tag';

describe('NavBar component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a list tag', () => {
    const wrapper = shallow(
      <NavBar
        LiTagOne={<LiTag to="/signup" value="Sign Up" />}
        LiTagTwo={<LiTag to="/login" value="Login" />}
      />
    );
    expect(wrapper.find('header'));
    expect(wrapper.find('nav'));
    expect(wrapper.find('ul'));
    expect(wrapper.find('div'));
    expect(wrapper.hasClass('main-header'));
  });
});
