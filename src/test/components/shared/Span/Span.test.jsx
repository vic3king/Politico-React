import React from 'react';
import { shallow } from 'enzyme';
import Span from '../../../../components/shared/Span/Span';

describe('Span component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Span />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a span tag', () => {
    const wrapper = shallow(<Span />);
    expect(wrapper.find('span'));
  });
});
