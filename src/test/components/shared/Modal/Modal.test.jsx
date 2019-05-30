import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../../components/shared/Modal/Modal';

describe('Modal component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a form tag', () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper.find('form'));
    expect(wrapper.hasClass('modal-main'));
  });
});
