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
import '../../../style/admin.scss';

class AdminPage extends Component {
  state = {
    showPartyModal: false,
    showOfficeModal: false,
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
    const { showOfficeModal, showPartyModal } = this.state;
    return (
      <React.Fragment>
        {showOfficeModal && <OfficeModal hide={this.hideOfficeModal} />}
        {showPartyModal && <PartyModal hide={this.hidePartyModal} />}
        <NavBar
          LiTagOne={<LiTag to="/home" value="Home" />}
          LiTagTwo={<LiTag to="/logout" value="Logout" />}
        />
        <div className="main">
          <SideBar
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
              <TopCard />
            </section>
            <section className="maim-section">
              <div>
                <h4 className="page-title">
                  Political Parties
                  <hr />
                </h4>
              </div>
              <BottomCard />
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPage;
