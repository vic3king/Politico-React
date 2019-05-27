import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../shared/NavBar/Navbar';
import Button from '../../shared/Buttons/Button';
import LiTag from '../../shared/Buttons/LI-tag';
import SideBar from '../../shared/SideBar/SideBar';
import TopCard from '../../shared/Cards/Profile-card-1';
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

  showPetitionsModal = () => {
    this.setState({ showPetitionsModal: true, showIntrestsModal: false });
  };

  hidePetitionsModal = () => {
    this.setState({ showPetitionsModal: false });
  };

  showIntrestsModal = () => {
    this.setState({ showIntrestsModal: true, showPetitionsModal: false });
  };

  hideIntrestsModal = () => {
    this.setState({ showIntrestsModal: false });
  };

  render() {
    const user = JSON.parse(localStorage.user);

    const {
      offices,
      loading,
      showPetitionsModal,
      parties,
      showIntrestsModal,
    } = this.state;
    return (
      <React.Fragment>
        {loading && <Loader />}
        {showIntrestsModal && (
          <InterestFormModal
            hide={this.hideIntrestsModal}
            offices={offices}
            parties={parties}
          />
        )}
        {showPetitionsModal && (
          <PetitionsModal hide={this.hidePetitionsModal} offices={offices} />
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
                value="Declare interest"
                offices={offices}
                handleEvent={this.showIntrestsModal}
              />
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PoliticiansPage;
