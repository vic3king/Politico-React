import React, { Component } from 'react';
import NavBar from '../../shared/NavBar/Navbar';
import Button from '../../shared/Buttons/Button';
import LiTag from '../../shared/Buttons/LI-tag';
import SideBar from '../../shared/SideBar/SideBar';
import TopCard from '../../shared/Cards/Profile-card-1';
import BottomCard from '../../shared/Cards/Profile-card-2';
import OfficeModal from '../../Modals/Office-modal';
import '../../../style/admin.scss';

class AdminPage extends Component {
  state = { showModal: false };

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal } = this.state;
    return (
      <React.Fragment>
        {showModal && <OfficeModal hide={this.hideModal} />}
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
                onClick={this.showModal}
              />
            }
            ButtonTwo={
              <Button id="party" value="Add Party" className="profile-btn" />
            }
            ButtonThree={
              <Button id="results" value="Results" className="profile-btn" />
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
                Button={<Button id="admin-office-card" value="View" />}
              />
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
