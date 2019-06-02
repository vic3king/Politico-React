import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import actions from '../../../../actions/auth.actions';
import types from '../../../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
  global.fetch = jest.fn();
  afterEach(() => {
    fetchMock.restore();
    fetchMock.config.fallbackToNetwork = false;
  });

  // it('should create an action to login', async () => {
  //   fetchMock.mock(
  //     '/api/v1/auth/login',
  //     {
  //       status: 200,
  //       body: [{ token: 'faketoken', user: {} }],
  //     },
  //     {
  //       method: 'POST',
  //       name: 'login',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );

  //   const userData = {
  //     email: 'pete@gmail.com',
  //     password: 'dummy',
  //   };

  //   await fetch('/api/v1/auth/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(userData),
  //   });

  //   const expectedAction = [
  //     {
  //       type: types.BEGIN_LOADING,
  //     },
  //   ];

  //   const store = mockStore({});

  //   store.dispatch(actions.login()).then(() => {
  //     expect(store.getActions()).toEqual(expectedAction);
  //   });
  // });

  it('should create an action for login failure', async () => {
    const expectedAction = [
      {
        type: types.LOGIN_FAILURE,
      },
    ];
    const store = mockStore({});

    store.dispatch(actions.loginFailure());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action for login admin success', async () => {
    const expectedAction = [
      {
        type: types.LOGIN_SUCCESS_ADMIN,
      },
    ];
    const store = mockStore({});

    store.dispatch(actions.loginSuccessAdmin());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should create an action for login politician success', async () => {
    const expectedAction = [
      {
        type: types.LOGIN_SUCCESS_POLITICIAN,
      },
    ];
    const store = mockStore({});

    store.dispatch(actions.loginSuccessPolitician());
    expect(store.getActions()).toEqual(expectedAction);
  });
  it('should create an action for login citizen success', async () => {
    const expectedAction = [
      {
        type: types.LOGIN_SUCCESS_CITIZEN,
      },
    ];
    const store = mockStore({});

    store.dispatch(actions.loginSuccessCitizen());
    expect(store.getActions()).toEqual(expectedAction);
  });
});
