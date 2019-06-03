import { combineReducers } from 'redux';
import isLoadingReducer from './loading.reducer';
import auth from './auth.reducer';
import offices from './offices.reducers';
import parties from './parties.reducers';

const reducers = combineReducers({
  auth,
  offices,
  parties,
  isLoadingReducer,
});

export default reducers;
