import { notify } from 'react-notify-toast';
import actions from '../constants/actionTypes';
import partiesServices from '../services/parties';
import handleErrorMessage from '../helpers/errorHandler';
import contentLoading from './loading.action';

const getPartiesSuccess = parties => {
  return {
    type: actions.FETCH_PARTIES_SUCCESS,
    parties,
  };
};

const getPartiesFailure = () => {
  return {
    type: actions.FETCH_PARTIES_FAILURE,
  };
};

const getAllParties = () => {
  return async dispatch => {
    dispatch(contentLoading());
    const res = await partiesServices.getAllParties();

    if (res.status >= 400) {
      dispatch(getPartiesFailure());
      notify.show(handleErrorMessage(res.error), 'error');
    }

    if (res.status === 200) {
      dispatch(getPartiesSuccess(res.data));
    }
  };
};

const partyAction = { getAllParties };

export default partyAction;
