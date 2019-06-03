import { notify } from 'react-notify-toast';
import actions from '../constants/actionTypes';
import officeServices from '../services/offices';
import handleErrorMessage from '../helpers/errorHandler';
import contentLoading from './loading.action';

const getOfficeSuccess = offices => {
  return {
    type: actions.FETCH_OFFICES_SUCCESS,
    offices,
  };
};

const getOfficeFailure = () => {
  return {
    type: actions.FETCH_OFFICES_FAILURE,
  };
};

const getAllOffices = () => {
  return async dispatch => {
    dispatch(contentLoading());
    const res = await officeServices.getAllOffices();

    if (res.status >= 400) {
      dispatch(getOfficeFailure());
      notify.show(handleErrorMessage(res.error), 'error');
    }

    if (res.status === 200) {
      dispatch(getOfficeSuccess(res.data));
    }
  };
};

const officeAction = { getAllOffices };

export default officeAction;
