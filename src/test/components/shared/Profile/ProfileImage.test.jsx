import React from 'react';
import { shallow } from 'enzyme';
import ProfileImage from '../../../../components/shared/Profile/ProfileImage';

describe('ProfileImage component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<ProfileImage />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a div tag', () => {
    const wrapper = shallow(<ProfileImage />);
    expect(wrapper.find('div'));
  });
});
