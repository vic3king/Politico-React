import actionTypes from '../constants/actionTypes';

const initialState = {
  loading: false,
  partiesList: [],
};

const parties = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PARTIES_SUCCESS:
      return { ...state, partiesList: action.parties, loading: false };
    case actionTypes.FETCH_PARTIES_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default parties;
