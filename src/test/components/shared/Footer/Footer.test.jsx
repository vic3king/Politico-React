import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../../components/shared/Footer/Footer';

describe('Footer component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a footer tag', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('footer'));
    expect(wrapper.hasClass('main-footer'));
  });
});
