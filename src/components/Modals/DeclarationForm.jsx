import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import Loader from '../shared/Loader/Loader';
import Input from '../shared/InputFields/Input';
import Interest from '../../services/interest';
import errorHandler from '../../helpers/errorHandler';
import '../../style/admin.scss';

class InterestFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formDetails: {},
      loading: false,
    };
  }

  hide = e => {
    e.preventDefault();
    const { hide } = this.props;
    hide();
  };

  onInputChange = event => {
    const { formDetails } = this.state;
    formDetails[event.target.id] = event.target.value;
    this.setState({ formDetails });
  };

  onButtonSubmit = async event => {
    const user = JSON.parse(localStorage.user);
    event.preventDefault();
    this.setState({ loading: true });
    const { hide } = this.props;
    const { formDetails } = this.state;
    formDetails.office = Number(formDetails.office);
    formDetails.party = Number(formDetails.party);
    formDetails.ageLimit = Number(formDetails.ageLimit);

    const interest = await Interest.interestRequest(formDetails, user.id);

    if (interest.status >= 400) {
      const errors = interest.error.map(error => error.error);
      notify.show(errorHandler(errors), 'error');
    }

    if (interest.status === 201) {
      this.setState({ loading: false });
      hide();
      notify.show('Your request has been recived and is being processed.');
    }
  };

  render() {
    const { formDetails, loading } = this.state;
    const { offices, parties } = this.props;

    return (
      <React.Fragment>
        <Notifications />
        {loading && <Loader />}
        <div>
          <section className="modal-main">
            <form className="modal-form">
              <h3 className="page-modal-title">Petition</h3>
              <div className="fix">
                <span>Select an office</span>
                <select id="office" onChange={this.onInputChange} required>
                  {offices.map(obj => (
                    <option key={obj.id} name={obj.name} value={obj.id}>
                      {obj.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="fix">
                <span>Select your party</span>
                <select
                  id="party"
                  className="interest-select"
                  onChange={this.onInputChange}
                  required
                >
                  {parties.map(obj => (
                    <option key={obj.id} name={obj.name} value={obj.id}>
                      {obj.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="fix">
                <span>Age</span>
                <Input
                  type="number"
                  id="ageLimit"
                  value={formDetails.ageLimit}
                  onChange={this.onInputChange}
                  required
                />
              </div>
              <button
                id="office-btn"
                type="submit"
                className="cte-off"
                onClick={this.onButtonSubmit}
              >
                Submit
              </button>
              <button type="button" id="btn" onClick={this.hide}>
                X
              </button>
            </form>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default InterestFormModal;
