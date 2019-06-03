import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../../shared/NavBar/Navbar';
import Button from '../../shared/Buttons/Button';
import LiTag from '../../shared/Buttons/LI-tag';
import SideBar from '../../shared/SideBar/SideBar';
import TopCard from '../../shared/Cards/Profile-card-1';
import BottomCard from '../../shared/Cards/Profile-card-2';
import ResultsPage from '../../Results/ResultsPage';
import CandidateIntrestRequestList from '../../CandidateIntrestRequests/CandidateIntrestRequestList';
import OfficeModal from '../../Modals/OfficeModal';
import PartyModal from '../../Modals/PartyModal';
import Loader from '../../shared/Loader/Loader';
import Parties from '../../../services/parties';
import '../../../style/admin.scss';

class AdminPage extends Component {
  state = {
    parties: [],
    showPartyModal: false,
    showOfficeModal: false,
    currentView: 'defaultPageView',
  };

  componentDidMount = async () => {
    const { getAllOffices } = this.props;
    const allParties = await Parties.getAllParties();
    await getAllOffices();
    this.setState({
      parties: allParties.data,
    });
  };

  handleChangeView = resultsPage => {
    this.setState({ currentView: resultsPage });
  };

  updateOfficesState = newUpdate => {
    const { offices } = this.state;
    const newState = [...offices, newUpdate];
    this.setState({ offices: newState });
  };

  updatePartiesState = newUpdate => {
    const { parties } = this.state;
    const newState = [...parties, newUpdate];
    this.setState({ parties: newState });
  };

  updatePartiesName = (partyId, newPartyName) => {
    const { parties } = this.state;
    const updatedParties = parties.map(party => {
      if (party.id === Number(partyId)) {
        return {
          ...party,
          name: newPartyName,
        };
      }
      return party;
    });

    this.setState({
      parties: updatedParties,
    });
  };

  updateDeletePartyState = partyId => {
    const { parties } = this.state;
    const newParties = parties.filter(
      singleParty => singleParty.id !== parseInt(partyId, 10)
    );
    this.setState({ parties: newParties });
  };

  showOfficeModal = () => {
    this.setState({ showOfficeModal: true, showPartyModal: false });
  };

  hideOfficeModal = () => {
    this.setState({ showOfficeModal: false });
  };

  showPartyModal = () => {
    this.setState({ showPartyModal: true, showOfficeModal: false });
  };

  hidePartyModal = () => {
    this.setState({ showPartyModal: false });
  };

  render() {
    const user = JSON.parse(localStorage.user);

    const { offices } = this.props;
    const { officeList, loading } = offices;

    const {
      showOfficeModal,
      showPartyModal,
      parties,
      currentView,
    } = this.state;
    return (
      <React.Fragment>
        {user.type !== 'admin' ? <Redirect to="/login" /> : null}
        {loading && <Loader />}
        {showOfficeModal && (
          <OfficeModal
            hide={this.hideOfficeModal}
            updateOfficesState={this.updateOfficesState}
          />
        )}
        {showPartyModal && (
          <PartyModal
            hide={this.hidePartyModal}
            updatePartiesState={this.updatePartiesState}
          />
        )}
        <NavBar show>
          <Button
            id="Dashboard"
            value="Dashboard"
            className="reset_button"
            onClick={() => this.handleChangeView('defaultPageView')}
          />
          <LiTag to="/logout" value="Logout" />
        </NavBar>
        <div className="main">
          <SideBar
            user={user}
            ButtonOne={
              <Button
                id="offic"
                value="Add Office"
                className="profile-btn"
                onClick={this.showOfficeModal}
              />
            }
            ButtonTwo={
              <Button
                id="party"
                value="Add Party"
                className="profile-btn"
                onClick={this.showPartyModal}
              />
            }
            ButtonThree={
              <Button
                id="results"
                value="Results"
                className="profile-btn"
                onClick={() => this.handleChangeView('resultsPage')}
              />
            }
            ButtonFour={
              <Button
                id="requests"
                value="Reveiw Requests"
                className="profile-btn"
                onClick={() => this.handleChangeView('reveiwRequestsPage')}
              />
            }
          />
          {currentView === 'defaultPageView' ? (
            <div className="boxed">
              <section className="main-section">
                <div>
                  <h4 className="page-title">
                    Open Positions
                    <hr />
                  </h4>
                </div>
                <TopCard value="View Running Candidates" offices={officeList} />
              </section>
              <section className="maim-section">
                <div>
                  <h4 className="page-title">
                    Political Parties
                    <hr />
                  </h4>
                </div>
                <BottomCard
                  parties={parties}
                  hidePartyModal={this.hidePartyModal}
                  hideOfficeModal={this.hideOfficeModal}
                  updateDelete={this.updateDeletePartyState}
                  updatePartiesName={this.updatePartiesName}
                />
              </section>
            </div>
          ) : null}
          {currentView === 'resultsPage' ? (
            <div className="boxed">
              <section className="main-section">
                <div>
                  <h4 className="page-title">
                    Election Results
                    <hr />
                  </h4>
                </div>
                <ResultsPage />
              </section>
            </div>
          ) : null}
          {currentView === 'reveiwRequestsPage' ? (
            <div className="boxed">
              <section className="main-section">
                <div>
                  <h4 className="page-title">
                    Review Pending Requests
                    <hr />
                  </h4>
                </div>
                <CandidateIntrestRequestList />
              </section>
            </div>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPage;
