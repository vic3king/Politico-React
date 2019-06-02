import authReducer from '../../../../reducers/auth.reducer';
import actions from '../../../../constants/actionTypes';

describe('auth reducers', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      loading: false,
      isAdmin: false,
      isCitizen: false,
      isPolitician: false,
      redirect: false,
      token: null,
    });
  });

  it('should handle BEGIN_LOADING', () => {
    expect(
      authReducer([], {
        type: actions.BEGIN_LOADING,
      })
    ).toEqual({
      loading: true,
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    expect(
      authReducer([], {
        type: actions.LOGIN_FAILURE,
      })
    ).toEqual({
      loading: false,
    });
  });

  it('should handle LOGIN_SUCCESS_ADMIN', () => {
    expect(
      authReducer([], {
        type: actions.LOGIN_SUCCESS_ADMIN,
        token: 'faketoken',
      })
    ).toEqual({
      loading: false,
      isAdmin: true,
      redirect: true,
      token: 'faketoken',
    });
  });

  it('should handle LOGIN_SUCCESS_CITIZEN', () => {
    expect(
      authReducer([], {
        type: actions.LOGIN_SUCCESS_CITIZEN,
        token: 'faketoken',
      })
    ).toEqual({
      loading: false,
      isCitizen: true,
      redirect: true,
      token: 'faketoken',
    });
  });

  it('should handle LOGIN_SUCCESS_POLITICIAN', () => {
    expect(
      authReducer([], {
        type: actions.LOGIN_SUCCESS_POLITICIAN,
        token: 'faketoken',
      })
    ).toEqual({
      loading: false,
      isPolitician: true,
      redirect: true,
      token: 'faketoken',
    });
  });
});
