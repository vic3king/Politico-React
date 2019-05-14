import React, { Component } from 'react';
import Notifications from 'react-notify-toast';
import Offices from '../../services/offices';
import ResultsModal from '../Modals/ResultModal';
import caputalizeString from '../../helpers/capitalizer';
import Button from '../shared/Buttons/Button';
import Loader from '../shared/Loader/Loader';

class ResultsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offices: [],
      loading: true,
      showResultsModal: false,
      officeId: null,
    };
  }

  componentDidMount = async () => {
    const allOffices = await Offices.getAllOffices();
    this.setState({ offices: allOffices.data, loading: false });
  };

  showOfficeModal = e => {
    this.setState({ showResultsModal: true, officeId: e.target.id });
  };

  hideResultsModal = () => {
    this.setState({ showResultsModal: false });
  };

  render() {
    const { offices, loading, showResultsModal, officeId } = this.state;

    const listOfOffices = offices.map(office => (
      <div key={office.id} className="card">
        <h6>
          {caputalizeString(office.name)}({caputalizeString(office.type)})
        </h6>
        <p className="num">0</p>
        <Button
          className="admin-office-card"
          id={office.id}
          value="View Result"
          onClick={this.showOfficeModal}
        />
      </div>
    ));

    return (
      <React.Fragment>
        <Notifications />
        {loading && <Loader />}
        <h4 className="page-title-results">Election Results</h4>
        {showResultsModal && (
          <ResultsModal hide={this.hideResultsModal} officeId={officeId} />
        )}
        <div id="grid">{listOfOffices}</div>
      </React.Fragment>
    );
  }
}

export default ResultsPage;
