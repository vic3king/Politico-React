import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../shared/NavBar/Navbar';
import Button from '../../shared/Buttons/Button';
import LiTag from '../../shared/Buttons/LI-tag';
import SideBar from '../../shared/SideBar/SideBar';
import TopCard from '../../shared/Cards/Profile-card-1';
import BottomCard from '../../shared/Cards/Profile-card-2';
import OfficeModal from '../../Modals/OfficeModal';
import PartyModal from '../../Modals/PartyModal';
import Loader from '../../shared/Loader/Loader';
import Offices from '../../../services/offices';
import Parties from '../../../services/parties';
import '../../../style/admin.scss';

class AdminPage extends Component {
  state = {
    offices: [],
    parties: [],
    showPartyModal: false,
    showOfficeModal: false,
    loading: true,
  };

  componentDidMount = async () => {
    const allOffices = await Offices.getAllOffices();
    const allParties = await Parties.getAllParties();
    this.setState({
      offices: allOffices.data,
      parties: allParties.data,
      loading: false,
    });
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
    let i;
    parties.filter((partyToUpdate, index) => {
      if (partyToUpdate.id === Number(partyId)) {
        i = index;
      }
      return i;
    });

    const newState = JSON.parse(JSON.stringify(parties));
    newState[i].name = newPartyName;

    this.setState({
      parties: newState,
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

    const {
      showOfficeModal,
      showPartyModal,
      offices,
      parties,
      loading,
    } = this.state;
    return (
      <React.Fragment>
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
        <NavBar
          LiTagOne={<LiTag to="/" value="Home" />}
          LiTagTwo={<LiTag to="/logout" value="Logout" />}
        />
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
              <Link to="/results">
                <Button id="results" value="Results" className="profile-btn" />
              </Link>
            }
            to="results"
          />
          <div className="boxed">
            <section className="main-section">
              <div>
                <h4 className="page-title">
                  Open Positions
                  <hr />
                </h4>
              </div>
              <TopCard offices={offices} />
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
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPage;
