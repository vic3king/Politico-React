import actionTypes from '../constants/actionTypes';

const initialState = {
  isAdmin: false,
  isCitizen: false,
  isPolitician: false,
  redirect: false,
  token: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_FAILURE:
      return { ...state };
    case actionTypes.LOGIN_SUCCESS_ADMIN:
      return {
        ...state,
        isAdmin: true,
        redirect: true,
        token: action.token,
      };
    case actionTypes.LOGIN_SUCCESS_POLITICIAN:
      return {
        ...state,
        isPolitician: true,
        redirect: true,
        token: action.token,
      };
    case actionTypes.LOGIN_SUCCESS_CITIZEN:
      return {
        ...state,
        isCitizen: true,
        redirect: true,
        token: action.token,
      };

    default:
      return state;
  }
};

export default auth;
