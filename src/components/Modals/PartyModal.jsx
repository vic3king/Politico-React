import React, { Component } from 'react';
import Modal from '../shared/Modal/Modal';
import Input from '../shared/InputFields/Input';
import Button from '../shared/Buttons/Button';
import Span from '../shared/Span/Span';
import Header from '../shared/Header/Header';

class PartyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formDetails: {
        name: '',
        address: '',
        logo: '',
      },
      //   loading: false,
      //   canRedirect: false,
      //   isAdmin: false,
    };
  }

  onInputChange = event => {
    const { formDetails } = this.state;
    formDetails[event.target.id] = event.target.value;
    this.setState({ formDetails });
  };

  onButtonSubmit = async event => {
    event.preventDefault();
  };

  hide = e => {
    e.preventDefault();
    const { hide } = this.props;
    hide();
  };

  render() {
    const { formDetails } = this.state;
    return (
      <Modal
        Header={<Header text="Create Party" />}
        SpanOne={<Span text="Name: " />}
        Select={
          <Input
            type="text"
            id="name"
            placeholder="what will this party be called"
            value={formDetails.name}
            onChange={this.onInputChange}
            required
          />
        }
        SpanTwo={<Span text="HQ Address: " />}
        InputOne={
          <Input
            type="email"
            id="address"
            placeholder="enter your address"
            value={formDetails.address}
            onChange={this.onInputChange}
            required
          />
        }
        SpanThree={<Span text="Upload Logo Url" />}
        InputTwo={
          <Input
            type="text"
            id="logo"
            value={formDetails.logo}
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
    );
  }
}

export default PartyModal;
