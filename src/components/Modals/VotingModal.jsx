import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import Loader from '../shared/Loader/Loader';
import Votes from '../../services/votes';
import errorHandler from '../../helpers/errorHandler';
import capitalizer from '../../helpers/capitalizer';
import '../../style/modal.scss';

class VotingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
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
    const candidates = await Votes.getCandidatesByOffice(officeId);

    if (candidates.data.length < 1) {
      this.setState({ loading: false });
      notify.show('No candidates available', 'error');
    }

    this.setState({ candidates: candidates.data });

    if (candidates.status >= 400) {
      this.setState({ loading: false });
      notify.show(errorHandler(candidates.error), 'error');
    }

    if (candidates.status === 200) {
      this.setState({ loading: false });
    }
  };

  onButtonSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { officeId, hide } = this.props;

    const office = Number(officeId);
    const candidate = Number(event.target.id);
    const formDetails = {
      office,
      candidate,
    };

    const vote = await Votes.voteCandidate(formDetails);

    if (vote.status >= 400) {
      this.setState({ loading: false });
      notify.show(errorHandler(vote.error.message), 'error');
    }

    if (vote.status === 201) {
      this.setState({ loading: false });
      hide();
      notify.show('success');
    }
  };

  render() {
    const { loading, candidates } = this.state;

    const candidatesList = candidates.map(candidate => (
      <div className="result-details" key={candidate.id}>
        <div className="profile__image__candidates" />
        <h6>
          Candidate: {capitalizer(candidate.firstname)}{' '}
          {capitalizer(candidate.lastname)}
        </h6>
        <h6>Party: {capitalizer(candidate.partyname)}</h6>
        <h6>Position: {candidate.officename}</h6>
        <button
          id={candidate.id}
          type="submit"
          className="vote-btn"
          onClick={this.onButtonSubmit}
        >
          Vote
        </button>
      </div>
    ));
    return (
      <React.Fragment>
        <Notifications />
        {loading && <Loader />}
        <div className="modal__results">
          <div className="modal-results">
            {candidatesList}
            <button type="button" id="btn" onClick={this.hide}>
              X
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VotingModal;
