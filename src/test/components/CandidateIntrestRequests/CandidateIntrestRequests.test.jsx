import React from 'react';
import { shallow } from 'enzyme';
import CandidateIntrestRequests from '../../../components/CandidateIntrestRequests/CandidateIntrestRequests';

describe('CandidateIntrestRequests component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<CandidateIntrestRequests />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('section'));
    expect(wrapper.find('div'));
    expect(wrapper.find('button'));
  });
});
