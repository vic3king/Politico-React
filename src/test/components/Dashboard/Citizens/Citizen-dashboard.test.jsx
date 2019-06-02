import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import CitizensPage from '../../../../components/Dashboard/Citizens/Citizens';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

const props = {
  offices: {
    officeList: [{ id: 'id', office: 'office' }],
  },
};

const CitizensPageComponent = (
  <Provider store={store}>
    <CitizensPage {...props} />
  </Provider>
);

describe('<CitizensPage />', () => {
  it('renders citizens page', () => {
    const wrapper = shallow(CitizensPageComponent);
    expect(wrapper.find('div'));
  });
});
