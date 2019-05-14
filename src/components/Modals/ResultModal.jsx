import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import Loader from '../shared/Loader/Loader';
import Results from '../../services/results';
import errorHandler from '../../helpers/errorHandler';
import capitalizer from '../../helpers/capitalizer';
import '../../style/modal.scss';

class ResultsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
    };
  }

  hide = e => {
    e.preventDefault();
    const { hide } = this.props;
    hide();
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    const { officeId } = this.props;
    const results = await Results.getResults(officeId);

    if (results.data.length < 1) {
      this.setState({ loading: false });
      notify.show('Result for this election is not yet available', 'error');
    }

    this.setState({ results: results.data });

    if (results.status >= 400) {
      this.setState({ loading: false });
      notify.show(errorHandler(results.error), 'error');
    }

    if (results.status === 200) {
      this.setState({ loading: false });
      notify.show('success');
    }
  };

  render() {
    const { loading, results } = this.state;

    const resultsList = results.map(result => (
      <div className="result-details">
        <div className="profile__image__candidates" />
        <h6>Party: {capitalizer(result.party)}</h6>
        <h6>
          Candidate: {capitalizer(result.firstname)}{' '}
          {capitalizer(result.lastname)}
        </h6>
        <p>
          Total Number of Votes: <b>{result.results}</b>
        </p>
      </div>
    ));
    return (
      <React.Fragment>
        <Notifications />
        {loading && <Loader />}
        <div className="modal__results">
          <div className="modal-results">
            {resultsList}
            <button type="button" id="btn" onClick={this.hide}>
              X
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ResultsModal;
