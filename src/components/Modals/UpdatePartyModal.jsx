import React, { Component } from 'react';
import Modal from '../shared/Modal/Modal';
import Input from '../shared/InputFields/Input';
import Button from '../shared/Buttons/Button';
import Header from '../shared/Header/Header';

class UpdatePartyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formDetails: {
        name: '',
      },
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

export default UpdatePartyModal;
