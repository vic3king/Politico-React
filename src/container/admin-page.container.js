import { connect } from 'react-redux';
import officeAction from '../actions/offices.actions';
import partyAction from '../actions/parties.actions';
import AdminPage from '../components/Dashboard/Admin/Admin';

const { getAllOffices } = officeAction;
const { getAllParties } = partyAction;

const mapStateToProps = ({ offices, parties, isLoadingReducer }) => ({
  offices,
  parties,
  isLoadingReducer,
});

export default connect(
  mapStateToProps,
  { getAllOffices, getAllParties }
)(AdminPage);
