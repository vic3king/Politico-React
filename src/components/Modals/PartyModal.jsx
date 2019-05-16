import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import Modal from '../shared/Modal/Modal';
import Input from '../shared/InputFields/Input';
import Button from '../shared/Buttons/Button';
import Span from '../shared/Span/Span';
import Header from '../shared/Header/Header';
import Party from '../../services/parties';
import Loader from '../shared/Loader/Loader';
import errorHandler from '../../helpers/errorHandler';

class PartyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PartyformDetails: {},
      loading: false,
    };
  }

  onInputChange = event => {
    const { PartyformDetails } = this.state;
    PartyformDetails[event.target.id] = event.target.value;
    this.setState({ PartyformDetails });
  };

  onButtonSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { PartyformDetails } = this.state;
    const party = await Party.postParty(PartyformDetails);

    if (party.status >= 400) {
      this.setState({ loading: false });
      notify.show(errorHandler(party.error), 'error');
    }

    if (party.status === 201) {
      this.setState({ loading: false });
      const { updatePartiesState, hide } = this.props;
      updatePartiesState(party.data);
      hide();
      notify.show('success');
    }
  };

  hide = e => {
    e.preventDefault();
    const { hide } = this.props;
    hide();
  };

  render() {
    const { PartyformDetails, loading } = this.state;
    return (
      <React.Fragment>
        <Notifications />
        {loading && <Loader />}
        <Modal
          Header={<Header text="Create Party" />}
          SpanOne={<Span text="Name: " />}
          Select={
            <Input
              type="text"
              id="name"
              placeholder="what will this party be called"
              value={PartyformDetails.name}
              onChange={this.onInputChange}
              required
            />
          }
          SpanTwo={<Span text="HQ Address: " />}
          InputOne={
            <Input
              type="text"
              id="hqAddress"
              placeholder="enter your address"
              value={PartyformDetails.hqAddress}
              onChange={this.onInputChange}
              required
            />
          }
          SpanThree={<Span text="Upload Logo Url" />}
          InputTwo={
            <Input
              type="text"
              id="logoUrl"
              value={PartyformDetails.logoUrl}
              placeholder="enter a link to your logo"
              onChange={this.onInputChange}
              required
            />
          }
          ButtonOne={
            <Button
              id="party-btn"
              type="submit"
              className="cte-off"
              value="Create office"
              onClick={this.onButtonSubmit}
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

export default PartyModal;
