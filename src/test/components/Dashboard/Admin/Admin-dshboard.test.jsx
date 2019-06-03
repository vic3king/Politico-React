import React from 'react';
import { shallow } from 'enzyme';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import configureMockStore from 'redux-mock-store';
import AdminPage from '../../../../components/Dashboard/Admin/Admin';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
// const store = mockStore({});

const props = {
  offices: {
    officeList: [{ id: 'id', office: 'office' }],
  },
  parties: {
    partiesList: [{ id: 'id', party: 'office' }],
  },
  isLoadingReducer: { loader: true },
};

const AdminPageComponent = <AdminPage {...props} />;

describe('<AdminPage />', () => {
  it('renders admin page', () => {
    localStorage.setItem('user', '{ "id": 2 }');
    const wrapper = shallow(AdminPageComponent);
    expect(wrapper.find('div'));
  });
});

describe('<AdminPage />', () => {
  it('renders Admin page', () => {
    const wrapper = shallow(AdminPageComponent);
    expect(wrapper.find('div'));
    wrapper.instance().showOfficeModal();
    wrapper.instance().hideOfficeModal();
    wrapper.instance().showPartyModal();
    wrapper.instance().hidePartyModal();
    wrapper.instance().handleChangeView();
    wrapper.instance().updateDeletePartyState(0);
    wrapper.instance().updatePartiesState([]);
  });
});
