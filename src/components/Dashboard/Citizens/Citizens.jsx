import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../shared/NavBar/Navbar';
import Button from '../../shared/Buttons/Button';
import LiTag from '../../shared/Buttons/LI-tag';
import SideBar from '../../shared/SideBar/SideBar';
import TopCard from '../../shared/Cards/Profile-card-1';
import Loader from '../../shared/Loader/Loader';
import Offices from '../../../services/offices';
import PetitionsModal from '../../Modals/PetitionsModal';
import VotingModal from '../../Modals/VotingModal';
import '../../../style/admin.scss';

class CitizensPage extends Component {
  state = {
    offices: [],
    loading: true,
    showPetitionsModal: false,
    showVotingModal: false,
    officeId: null,
  };

  async componentDidMount() {
    const allOffices = await Offices.getAllOffices();
    this.setState({
      offices: allOffices.data,
      loading: false,
    });
  }

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
    const user = JSON.parse(localStorage.getItem('user'));
    const {
      offices,
      loading,
      showPetitionsModal,
      officeId,
      showVotingModal,
    } = this.state;
    return (
      <React.Fragment>
        {loading && <Loader />}
        {showPetitionsModal && (
          <PetitionsModal hide={this.hidePetitionsModal} offices={offices} />
        )}
        {showVotingModal && (
          <VotingModal hide={this.hideVotingModal} officeId={officeId} />
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
                value="Raise Petition"
                className="profile-btn"
                onClick={this.showPetitionsModal}
              />
            }
            ButtonTwo={
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
              <TopCard
                value="View"
                offices={offices}
                handleEvent={this.showVotingModal}
              />
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CitizensPage;
