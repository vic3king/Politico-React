import React, { Component } from 'react';
import Modal from '../shared/Modal/Modal';
import Input from '../shared/InputFields/Input';
import Button from '../shared/Buttons/Button';
import Span from '../shared/Span/Span';
import Header from '../shared/Header/Header';
import Select from '../shared/Select/Select';

class OffficeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formDetails: {
        officename: '',
        age: '',
        selecttype: 'federal',
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
        Header={<Header text="Create a Political Office:" />}
        SpanOne={<Span text="Office Type: " />}
        Select={<Select onChange={this.onInputChange} />}
        SpanTwo={<Span text="Office: " />}
        InputOne={
          <Input
            type="text"
            id="officename"
            placeholder="e.g Local government Chairman"
            value={formDetails.officename}
            onChange={this.onInputChange}
            required
          />
        }
        SpanThree={<Span text="AgeLimit" />}
        InputTwo={
          <Input
            type="number"
            id="age"
            value={formDetails.age}
            onChange={this.onInputChange}
            required
          />
        }
        ButtonOne={
          <Button
            id="office-btn"
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

export default OffficeModal;
