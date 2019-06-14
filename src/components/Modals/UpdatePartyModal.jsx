import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import Modal from '../shared/Modal/Modal';
import Input from '../shared/InputFields/Input';
import Button from '../shared/Buttons/Button';
import Header from '../shared/Header/Header';
import Parties from '../../services/parties';
import Loader from '../shared/Loader/Loader';
import errorHandler from '../../helpers/errorHandler';

class UpdatePartyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formDetails: {},
      loading: false,
    };
  }

  onInputChange = event => {
    const { formDetails } = this.state;
    formDetails[event.target.id] = event.target.value;
    this.setState({ formDetails });
  };

  handleUpdate = async () => {
    this.setState({ loading: true });
    const { partyId, updatePartiesName, hide } = this.props;
    const { formDetails } = this.state;

    const party = await Parties.updateParty(partyId, formDetails);

    if (party.status >= 400) {
      this.setState({ loading: false });
      notify.show(errorHandler(party.error), 'error');
    }

    if (party.status === 200) {
      this.setState({ loading: false });
      updatePartiesName(partyId, party.data.name);
      notify.show(party.message);
      hide();
    }
  };

  hide = e => {
    e.preventDefault();
    const { hide } = this.props;
    hide();
  };

  render() {
    const { formDetails, loading } = this.state;
    return (
      <React.Fragment>
        {loading && <Loader />}
        <Modal
          Header={<Header text="Update Party" />}
          Select={
            <Input
              type="text"
              id="name"
              placeholder="update party name"
              value={formDetails.name}
              onChange={this.onInputChange}
              required
            />
          }
          ButtonOne={
            <Button
              id="party-btn"
              type="submit"
              className="cte-off"
              value="Update"
              onClick={this.handleUpdate}
            />
          }
          CloseModal={
            <button type="button" id="btn" onClick={this.hide}>
              X
            </button>
          }
        />
      </React.Fragment>
    );
  }
}

export default UpdatePartyModal;
