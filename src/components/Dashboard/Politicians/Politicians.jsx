import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../../shared/NavBar/Navbar';
import Button from '../../shared/Buttons/Button';
import LiTag from '../../shared/Buttons/LI-tag';
import SideBar from '../../shared/SideBar/SideBar';
import TopCard from '../../shared/Cards/Profile-card-1';
import ResultsPage from '../../Results/ResultsPage';
import Loader from '../../shared/Loader/Loader';
import Offices from '../../../services/offices';
import Parties from '../../../services/parties';
import PetitionsModal from '../../Modals/PetitionsModal';
import InterestFormModal from '../../Modals/DeclarationForm';
import '../../../style/admin.scss';

class PoliticiansPage extends Component {
  state = {
    offices: [],
    parties: [],
    loading: true,
    showPetitionsModal: false,
    showIntrestsModal: false,
    officeId: null,
    currentView: 'defaultPageView',
  };

  async componentDidMount() {
    const allOffices = await Offices.getAllOffices();
    const allParties = await Parties.getAllParties();
    this.setState({
      offices: allOffices.data,
      parties: allParties.data,
      loading: false,
    });
  }

  handleChangeView = resultsPage => {
    this.setState({ currentView: resultsPage });
  };

  showPetitionsModal = () => {
    this.setState({ showPetitionsModal: true, showIntrestsModal: false });
  };

  hidePetitionsModal = () => {
    this.setState({ showPetitionsModal: false });
  };

  showIntrestsModal = e => {
    this.setState({
      showIntrestsModal: true,
      showPetitionsModal: false,
      officeId: e.target.id,
    });
  };

  hideIntrestsModal = () => {
    this.setState({ showIntrestsModal: false });
  };

  render() {
    const user = JSON.parse(localStorage.user);
    const { officeId } = this.state;

    const {
      offices,
      loading,
      showPetitionsModal,
      parties,
      showIntrestsModal,
      currentView,
    } = this.state;
    return (
      <React.Fragment>
        {user.type !== 'politician' ? <Redirect to="/login" /> : null}
        {loading && <Loader />}
        {showIntrestsModal && (
          <InterestFormModal
            hide={this.hideIntrestsModal}
            offices={offices}
            parties={parties}
            officeId={officeId}
          />
        )}
        {showPetitionsModal && (
          <PetitionsModal hide={this.hidePetitionsModal} offices={offices} />
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
                  value="Declare interest"
                  offices={offices}
                  handleEvent={this.showIntrestsModal}
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

export default PoliticiansPage;
