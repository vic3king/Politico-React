import { connect } from 'react-redux';
import authAction from '../actions/auth.actions';
import Login from '../components/Registration/Login';

const { login } = authAction;

const mapStateToProps = ({ auth, isLoadingReducer }) => ({
  auth,
  isLoadingReducer,
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
