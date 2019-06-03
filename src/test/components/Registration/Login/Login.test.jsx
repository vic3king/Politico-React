import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import LoginPage from '../../../../components/Registration/Login';

const initialState = {
  auth: {
    isAdmin: false,
    isCitizen: false,
    isPolitician: false,
    redirect: false,
    token: null,
  },
};

const props = {
  login: jest.fn(),
  isLoadingReducer: { loader: true },
  auth: { isAdmin: '', isCitizen: '', isPolitician: '' },
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

const LoginPageComponent = (
  <Provider store={store}>
    <LoginPage auth={{ fake: 'test' }} {...props} />
  </Provider>
);

describe('<LoginPage />', () => {
  it('renders login page', () => {
    const wrapper = shallow(LoginPageComponent);
    expect(wrapper.find('div'));
  });
});

describe('<LoginPage />', () => {
  it('renders login page', () => {
    const inputEvent = { target: { id: 'name', value: 'pcp' } };
    const wrapper = shallow(<LoginPage auth={{ fake: 'yup' }} {...props} />);
    expect(wrapper.find('div'));
    wrapper.instance().onInputChange(inputEvent);
    wrapper.instance().onButtonSubmit();
  });
});
