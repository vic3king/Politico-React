import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import PoliticiansPage from '../../../../components/Dashboard/Politicians/Politicians';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

const props = {
  offices: {
    officeList: [{ id: 'id', office: 'office' }],
  },
};

const PoliticiansPageComponent = (
  <Provider store={store}>
    <PoliticiansPage {...props} />
  </Provider>
);

describe('<PoliticiansPage />', () => {
  it('renders politicians page', () => {
    const wrapper = shallow(PoliticiansPageComponent);
    expect(wrapper.find('div'));
  });
});
