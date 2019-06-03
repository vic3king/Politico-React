import { connect } from 'react-redux';
import officeAction from '../actions/offices.actions';
import PoliticiansPage from '../components/Dashboard/Politicians/Politicians';

const { getAllOffices } = officeAction;

const mapStateToProps = ({ offices }) => ({ offices });

export default connect(
  mapStateToProps,
  { getAllOffices }
)(PoliticiansPage);
