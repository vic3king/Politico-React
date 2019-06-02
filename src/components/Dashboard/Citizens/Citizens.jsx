import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../../shared/NavBar/Navbar';
import Button from '../../shared/Buttons/Button';
import LiTag from '../../shared/Buttons/LI-tag';
import SideBar from '../../shared/SideBar/SideBar';
import TopCard from '../../shared/Cards/Profile-card-1';
import ResultsPage from '../../Results/ResultsPage';
import Loader from '../../shared/Loader/Loader';
import PetitionsModal from '../../Modals/PetitionsModal';
import VotingModal from '../../Modals/VotingModal';
import '../../../style/admin.scss';

class CitizensPage extends Component {
  state = {
    showPetitionsModal: false,
    showVotingModal: false,
    officeId: null,
    currentView: 'defaultPageView',
  };

  async componentDidMount() {
    const { getAllOffices } = this.props;
    getAllOffices();
  }

  handleChangeView = resultsPage => {
    this.setState({ currentView: resultsPage });
  };

  showPetitionsModal = () => {
    this.setState({ showPetitionsModal: true });
  };

  hidePetitionsModal = () => {
    this.setState({ showPetitionsModal: false });
  };

  showVotingModal = e => {
    this.setState({ showVotingModal: true, officeId: e.target.id });
  };

  hideVotingModal = () => {
    this.setState({ showVotingModal: false });
  };

  render() {
    const user = JSON.parse(localStorage.user);
    const { offices } = this.props;
    const { officeList, loading } = offices;

    const {
      showPetitionsModal,
      officeId,
      showVotingModal,
      currentView,
    } = this.state;
    return (
      <React.Fragment>
        {user.type !== 'citizen' ? <Redirect to="/login" /> : null}
        {loading && <Loader />}
        {showPetitionsModal && (
          <PetitionsModal hide={this.hidePetitionsModal} offices={officeList} />
        )}
        {showVotingModal && (
          <VotingModal hide={this.hideVotingModal} officeId={officeId} />
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
                value="Raise Petition"
                className="profile-btn"
                onClick={this.showPetitionsModal}
              />
            }
            ButtonTwo={
              <Button
                id="results"
                value="Results"
                className="profile-btn"
                onClick={() => this.handleChangeView('resultsPage')}
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
                <TopCard
                  value="View to Vote"
                  offices={officeList}
                  handleEvent={this.showVotingModal}
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
        </div>
      </React.Fragment>
    );
  }
}

export default CitizensPage;
