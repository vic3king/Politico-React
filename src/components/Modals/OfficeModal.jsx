import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import Modal from '../shared/Modal/Modal';
import Input from '../shared/InputFields/Input';
import Button from '../shared/Buttons/Button';
import Span from '../shared/Span/Span';
import Header from '../shared/Header/Header';
import Select from '../shared/Select/Select';
import Office from '../../services/offices';
import Loader from '../shared/Loader/Loader';
import errorHandler from '../../helpers/errorHandler';

class OffficeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OfficeformDetails: { type: 'federal' },
      loading: false,
    };
  }

  onInputChange = event => {
    const { OfficeformDetails } = this.state;
    OfficeformDetails[event.target.id] = event.target.value;
    this.setState({ OfficeformDetails });
  };

  onButtonSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { OfficeformDetails } = this.state;
    OfficeformDetails.ageLimit = Number(OfficeformDetails.ageLimit);
    const office = await Office.postOffice(OfficeformDetails);

    if (office.status >= 400) {
      this.setState({ loading: false });
      notify.show(errorHandler(office.error), 'error');
    }

    if (office.status === 201) {
      this.setState({ loading: false });
      notify.show('success');
    }
  };

  hide = e => {
    e.preventDefault();
    const { hide } = this.props;
    hide();
  };

  render() {
    const { OfficeformDetails, loading } = this.state;
    return (
      <React.Fragment>
        <Notifications />
        {loading && <Loader />}
        <Modal
          Header={<Header text="Create a Political Office:" />}
          SpanOne={<Span text="Office Type: " />}
          Select={<Select onChange={this.onInputChange} />}
          SpanTwo={<Span text="Office: " />}
          InputOne={
            <Input
              type="text"
              id="name"
              placeholder="e.g Local government Chairman"
              value={OfficeformDetails.name}
              onChange={this.onInputChange}
              required
            />
          }
          SpanThree={<Span text="AgeLimit" />}
          InputTwo={
            <Input
              type="number"
              id="ageLimit"
              value={OfficeformDetails.ageLimit}
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
      </React.Fragment>
    );
  }
}

export default OffficeModal;
