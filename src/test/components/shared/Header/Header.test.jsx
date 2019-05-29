import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../../components/shared/Header/Header';

describe('Header component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an h3 tag', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('h3'));
  });
});
