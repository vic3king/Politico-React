import React, { Component } from 'react';
import '../../../style/profile.scss';
import Button from '../Buttons/Button';
import UpdatePartyModal from '../../Modals/UpdatePartyModal';
import DeleteModal from '../../Modals/DeletePartyModal';

class ProfileBottomSectionCard extends Component {
  state = {
    showUpdateModal: false,
    showDeleteModal: false,
  };

  showUpdateModal = () => {
    this.setState({ showUpdateModal: true, showDeleteModal: false });
  };

  hideUpdateModal = () => {
    this.setState({ showUpdateModal: false });
  };

  showDeleteModal = () => {
    this.setState({ showDeleteModal: true, showUpdateModal: false });
  };

  hideDeleteModal = () => {
    this.setState({ showDeleteModal: false });
  };

  render() {
    const { showUpdateModal, showDeleteModal } = this.state;

    return (
      <React.Fragment>
        {showUpdateModal && <UpdatePartyModal hide={this.hideUpdateModal} />}
        {showDeleteModal && <DeleteModal hide={this.hideDeleteModal} />}
        <div id="grid__two">
          <div className="card__two">
            <div className="party__image2" />
            <div className="card__details">
              <p id="party">
                <b>Party</b>: APC
              </p>
              <p id="member">
                <b>Members</b>: 00
              </p>
              <p id="address">
                <b>Hq address</b>: Ikorodu dddRoad, Lagos, Nigeria
              </p>
            </div>
            <div>
              <Button
                id="edit-name"
                className="edit-btn"
                value="Edit"
                onClick={this.showUpdateModal}
              />
              <Button
                id="edit-name"
                className="delete-record"
                value="Delete"
                onClick={this.showDeleteModal}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileBottomSectionCard;
