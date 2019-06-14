import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
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
      currentPage: 1,
      partiesPerPage: 4,
    };
  }

  handlePageClick = event => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  hide = () => {
    const { hidePartyModal, hideOfficeModal } = this.props;
    hideOfficeModal();
    hidePartyModal();
  };

  showUpdateModal = e => {
    this.hide();
    this.setState({
      showUpdateModal: true,
      showDeleteModal: false,
      partyId: e.target.id,
    });
  };

  hideUpdateModal = () => {
    this.setState({ showUpdateModal: false });
  };

  showDeleteModal = e => {
    this.hide();
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
    const {
      showUpdateModal,
      showDeleteModal,
      partyId,
      loading,
      currentPage,
      partiesPerPage,
    } = this.state;

    const { parties, updatePartiesName } = this.props;

    // Logic for displaying todos
    const indexOfLastOffice = currentPage * partiesPerPage;
    const indexOfFirstOffice = indexOfLastOffice - partiesPerPage;
    const currentParties = parties.slice(indexOfFirstOffice, indexOfLastOffice);

    // Logic for displaying page numbers
    const pageNumbers = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= Math.ceil(parties.length / partiesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <Button
          type="submit"
          key={number}
          id={number}
          value={number}
          onClick={this.handlePageClick}
        />
      );
    });

    const listOfParties = currentParties.map(party => (
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
        {loading && <Loader />}
        {showUpdateModal && (
          <UpdatePartyModal
            parties={parties}
            hide={this.hideUpdateModal}
            partyId={partyId}
            updatePartiesName={updatePartiesName}
          />
        )}
        {showDeleteModal && (
          <DeleteModal
            hide={this.hideDeleteModal}
            handleDelete={this.handleDelete}
            partyId={partyId}
          />
        )}
        <div id="grid__two">{listOfParties}</div>
        <div className="middle">
          <div id="page-numbers" className="pagination">
            {renderPageNumbers}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileBottomSectionCard;
