import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import AdminPage from '../../../../components/Dashboard/Admin/Admin';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

const props = {
  offices: {
    officeList: [{ id: 'id', office: 'office' }],
  },
};

const AdminPageComponent = (
  <Provider store={store}>
    <AdminPage {...props} />
  </Provider>
);

describe('<AdminPage />', () => {
  it('renders admin page', () => {
    const wrapper = shallow(AdminPageComponent);
    expect(wrapper.find('div'));
  });
});
