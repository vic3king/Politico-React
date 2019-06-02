import actionTypes from '../constants/actionTypes';

const initialState = {
  loading: false,
  officeList: [],
};

const offices = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BEGIN_LOADING:
      return { ...state, loading: true };
    case actionTypes.FETCH_OFFICES_SUCCESS:
      return { ...state, officeList: action.offices, loading: false };
    case actionTypes.FETCH_OFFICES_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default offices;
