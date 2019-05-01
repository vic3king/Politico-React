import React, { Component } from 'react';
import '../../../style/profile.scss';
import Button from '../Buttons/Button';
import UpdatePartyModal from '../../Modals/UpdatePartyModal';
import DeleteModal from '../../Modals/DeletePartyModal';
import Parties from '../../../services/parties';

class ProfileBottomSectionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parties: [],
      showUpdateModal: false,
      showDeleteModal: false,
    };
  }

  componentDidMount = async () => {
    const allParties = await Parties.getAllParties();
    this.setState({ parties: allParties.data });
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
    const { showUpdateModal, showDeleteModal, parties } = this.state;

    const listOfParties = parties.map(party => (
      <div key={party.id} className="card__two">
        <div>
          <img src={party.logourl} alt="party" className="party__image2" />
        </div>
        <div className="card__details">
          <p id="party">
            <b>Party</b>: {party.name}
          </p>
          <p id="member">
            <b>Members</b>: 00
          </p>
          <p id="address">
            <b>Hq address</b>: {party.hqaddress}
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
    ));
    return (
      <React.Fragment>
        {showUpdateModal && <UpdatePartyModal hide={this.hideUpdateModal} />}
        {showDeleteModal && <DeleteModal hide={this.hideDeleteModal} />}
        <div id="grid__two">{listOfParties}</div>
      </React.Fragment>
    );
  }
}

export default ProfileBottomSectionCard;
