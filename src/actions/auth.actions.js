import { notify } from 'react-notify-toast';
import actions from '../constants/actionTypes';
import authServices from '../services/authentication.services';
import errorHandler from '../helpers/errorHandler';

const contentLoading = () => {
  return {
    type: actions.BEGIN_LOADING,
  };
};

const loginSuccessAdmin = token => {
  return {
    type: actions.LOGIN_SUCCESS_ADMIN,
    token,
  };
};
const loginSuccessPolitician = token => {
  return {
    type: actions.LOGIN_SUCCESS_POLITICIAN,
    token,
  };
};
const loginSuccessCitizen = token => {
  return {
    type: actions.LOGIN_SUCCESS_CITIZEN,
    token,
  };
};

const loginFailure = () => {
  return {
    type: actions.LOGIN_FAILURE,
  };
};

const login = userDetails => {
  return dispatch => {
    dispatch(contentLoading());
    return authServices.auth('login', userDetails).then(res => {
      if (res.status >= 400) {
        dispatch(loginFailure());
        notify.show(errorHandler(res.error), 'error');
      }

      if (res.status === 200) {
        localStorage.setItem('token', res.data[0].token);
        localStorage.setItem('user', JSON.stringify(res.data[0].user));
        if (res.data[0].user.type === 'admin') {
          dispatch(loginSuccessAdmin(res.data[0].token));
        }
        if (res.data[0].user.type === 'politician') {
          dispatch(loginSuccessPolitician(res.data[0].token));
        }
        if (res.data[0].user.type === 'citizen') {
          dispatch(loginSuccessCitizen(res.data[0].token));
        }
      }
    });
  };
};

const authAction = {
  login,
  loginSuccessAdmin,
  loginSuccessPolitician,
  loginSuccessCitizen,
  loginFailure,
};

export default authAction;
