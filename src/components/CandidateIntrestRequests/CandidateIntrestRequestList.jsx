import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import CandidateIntrestRequestsCard from './CandidateIntrestRequests';
import Vote from '../../services/votes';
import Loader from '../shared/Loader/Loader';
import Interest from '../../services/interest';
import errorHandler from '../../helpers/errorHandler';

class CandidateIntrestRequestsList extends Component {
  state = {
    candidates: [],
    loading: true,
  };

  async componentDidMount() {
    const pendingCandidates = await Vote.getCandidatesByStatus();

    this.setState({
      candidates: pendingCandidates.data,
      loading: false,
    });
  }

  updateCandidatesState = candidateId => {
    const { candidates } = this.state;
    const newCandidatesList = candidates.filter(
      candidate => candidate.id !== parseInt(candidateId, 10)
    );

    this.setState({ candidates: newCandidatesList });
  };

  adminAcceptRequest = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    const candidateId = event.target.id;
    const formDetails = { status: 'approved' };

    const acceptedReveiw = await Interest.processRequest(
      formDetails,
      candidateId
    );

    if (acceptedReveiw.status >= 400) {
      this.setState({ loading: false });
      notify.show(errorHandler(acceptedReveiw.errors.message), 'error');
    }

    if (acceptedReveiw.status === 200) {
      this.setState({ loading: false });
      notify.show('Candidate Approved');
      this.updateCandidatesState(candidateId);
    }
  };

  adminRejectRequest = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    const candidateId = event.target.id;
    const formDetails = { status: 'rejected' };

    const rejectedReveiw = await Interest.processRequest(
      formDetails,
      candidateId
    );

    if (rejectedReveiw.status >= 400) {
      this.setState({ loading: false });
      notify.show(errorHandler(rejectedReveiw.errors.message), 'error');
    }

    if (rejectedReveiw.status === 200) {
      this.setState({ loading: false });
      notify.show('Candidate Rejected');
      this.updateCandidatesState(candidateId);
    }
  };

  render() {
    const { candidates, loading } = this.state;

    return (
      <React.Fragment>
        {loading && <Loader />}
        <div>
          <div className="main_page_title">
            <div className="main-grid">
              {candidates.map(candidate => (
                <CandidateIntrestRequestsCard
                  key={candidate.id}
                  id={candidate.id}
                  fullname={`${candidate.firstname} ${candidate.lastname}`}
                  office={candidate.officename}
                  party={candidate.partyname}
                  button="Accept"
                  adminAcceptRequest={this.adminAcceptRequest}
                  adminRejectRequest={this.adminRejectRequest}
                  btnClass="btn-accept"
                  btnClass1="btn-reject"
                />
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CandidateIntrestRequestsList;
