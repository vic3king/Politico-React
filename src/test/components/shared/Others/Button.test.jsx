import React from 'react';
import { shallow } from 'enzyme';

import Button from '../../../../components/shared/Buttons/Button';
import LiTag from '../../../../components/shared/Buttons/LI-tag';

describe('<Button />', () => {
  it('should render button component', () => {
    const wrap = shallow(<Button value="sign up" id="1" />);
    expect(wrap.find('button'));
  });
});

describe('<LiTag />', () => {
  it('should render a list tag', () => {
    const wrapper = shallow(<LiTag to="/" value="Test" />);
    expect(wrapper.find('li'));
    expect(wrapper.hasClass('main-nav__item'));
  });
});
