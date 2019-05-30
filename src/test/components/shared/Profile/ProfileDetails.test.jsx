import React from 'react';
import { shallow } from 'enzyme';
import ProfileDetails from '../../../../components/shared/Profile/ProfileDetails';

const user = {
  firstname: '',
  lastname: '',
  othernames: '',
  email: '',
  phonenumber: '',
};
describe('ProfileDetails component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<ProfileDetails user={user} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a div tag', () => {
    const wrapper = shallow(<ProfileDetails user={user} />);
    expect(wrapper.find('div'));
  });
});
