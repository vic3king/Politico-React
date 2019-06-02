import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import auth from './auth.reducer';
import offices from './offices.reducers';

const reducers = combineReducers({
  auth,
  offices,
  loadingBar: loadingBarReducer,
});

export default reducers;
