import authReducer from '../../../../reducers/auth.reducer';
import actions from '../../../../constants/actionTypes';

describe('auth reducers', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      isAdmin: false,
      isCitizen: false,
      isPolitician: false,
      redirect: false,
      token: null,
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    expect(
      authReducer([], {
        type: actions.LOGIN_FAILURE,
      })
    ).toEqual({});
  });

  it('should handle LOGIN_SUCCESS_ADMIN', () => {
    expect(
      authReducer([], {
        type: actions.LOGIN_SUCCESS_ADMIN,
        token: 'faketoken',
      })
    ).toEqual({
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
      isPolitician: true,
      redirect: true,
      token: 'faketoken',
    });
  });
});
