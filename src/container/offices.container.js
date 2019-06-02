import { connect } from 'react-redux';
import officeAction from '../actions/offices.actions';
import CitizensPage from '../components/Dashboard/Citizens/Citizens';

const { getAllOffices } = officeAction;

const mapStateToProps = ({ offices }) => ({ offices });

export default connect(
  mapStateToProps,
  { getAllOffices }
)(CitizensPage);
