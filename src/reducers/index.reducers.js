import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import auth from './auth.reducer';

const reducers = combineReducers({
  auth,
  loadingBar: loadingBarReducer,
});

export default reducers;
