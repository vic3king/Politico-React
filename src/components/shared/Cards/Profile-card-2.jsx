import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import Button from '../Buttons/Button';
import UpdatePartyModal from '../../Modals/UpdatePartyModal';
import DeleteModal from '../../Modals/DeletePartyModal';
import Parties from '../../../services/parties';
import Loader from '../Loader/Loader';
import errorHandler from '../../../helpers/errorHandler';
import '../../../style/profile.scss';

class ProfileBottomSectionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateModal: false,
      showDeleteModal: false,
      loading: false,
      partyId: null,
    };
  }

  showUpdateModal = () => {
    this.setState({ showUpdateModal: true, showDeleteModal: false });
  };

  hideUpdateModal = () => {
    this.setState({ showUpdateModal: false });
  };

  showDeleteModal = e => {
    this.setState({
      showDeleteModal: true,
      showUpdateModal: false,
      partyId: e.target.id,
    });
  };

  hideDeleteModal = () => {
    this.setState({ showDeleteModal: false });
  };

  handleDelete = async () => {
    this.setState({ loading: true });
    const { partyId } = this.state;

    const party = await Parties.deleteParty(partyId);

    if (party.status >= 400) {
      this.setState({ loading: false });
      notify.show(errorHandler(party.error), 'error');
    }

    if (party.status === 200) {
      this.setState({ loading: false });
      notify.show(party.message);

      const { updateDelete } = this.props;
      updateDelete(partyId);
      this.setState({ showDeleteModal: false });
    }
  };

  render() {
    const { showUpdateModal, showDeleteModal, partyId, loading } = this.state;

    const { parties } = this.props;

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
            id={party.id}
            className="edit-btn"
            value="Edit"
            onClick={this.showUpdateModal}
          />
          <Button
            id={party.id}
            className="delete-record"
            value="Delete"
            onClick={this.showDeleteModal}
          />
        </div>
      </div>
    ));
    return (
      <React.Fragment>
        <Notifications />
        {loading && <Loader />}
        {showUpdateModal && <UpdatePartyModal hide={this.hideUpdateModal} />}
        {showDeleteModal && (
          <DeleteModal
            hide={this.hideDeleteModal}
            handleDelete={this.handleDelete}
            partyId={partyId}
          />
        )}
        <div id="grid__two">{listOfParties}</div>
      </React.Fragment>
    );
  }
}

export default ProfileBottomSectionCard;
