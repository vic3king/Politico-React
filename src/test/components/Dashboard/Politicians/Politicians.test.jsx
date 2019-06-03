import React from 'react';
import { shallow } from 'enzyme';
import PoliticiansPage from '../../../../components/Dashboard/Politicians/Politicians';

const props = {
  offices: {
    officeList: [{ id: 'id', office: 'office' }],
  },
};

const PoliticiansPageComponent = <PoliticiansPage {...props} />;

describe('<PoliticiansPage />', () => {
  it('renders politicians page', () => {
    localStorage.setItem('user', '{ "id": 2 }');
    const wrapper = shallow(PoliticiansPageComponent);
    expect(wrapper.find('div'));
  });
});

describe('<PoliticiansPage />', () => {
  it('renders Politicians page', () => {
    const event = {
      target: {
        id: 2,
      },
    };
    const wrapper = shallow(PoliticiansPageComponent);
    expect(wrapper.find('div'));
    wrapper.instance().hideIntrestsModal();
    wrapper.instance().showIntrestsModal(event);
    wrapper.instance().hidePetitionsModal();
    wrapper.instance().handleChangeView();
  });
});
