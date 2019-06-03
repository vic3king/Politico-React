import { connect } from 'react-redux';
import officeAction from '../actions/offices.actions';
import AdminPage from '../components/Dashboard/Admin/Admin';

const { getAllOffices } = officeAction;

const mapStateToProps = ({ offices }) => ({ offices });

export default connect(
  mapStateToProps,
  { getAllOffices }
)(AdminPage);
