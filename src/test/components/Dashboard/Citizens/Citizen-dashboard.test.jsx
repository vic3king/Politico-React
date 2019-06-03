import React from 'react';
import { shallow } from 'enzyme';
import CitizensPage from '../../../../components/Dashboard/Citizens/Citizens';

const props = {
  offices: {
    officeList: [{ id: 'id', office: 'office' }],
  },
};

const CitizensPageComponent = <CitizensPage {...props} />;

describe('<CitizensPage />', () => {
  it('renders citizens page', () => {
    localStorage.setItem('user', '{ "id": 2 }');
    const wrapper = shallow(CitizensPageComponent);
    expect(wrapper.find('div'));
  });
});

describe('<CitizensPage />', () => {
  it('renders Citizens page', () => {
    const event = {
      target: {
        id: 2,
      },
    };
    const wrapper = shallow(CitizensPageComponent);
    expect(wrapper.find('div'));
    wrapper.instance().showPetitionsModal();
    wrapper.instance().hidePetitionsModal();
    wrapper.instance().showVotingModal(event);
    wrapper.instance().hideVotingModal();
  });
});
