import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import Loader from '../shared/Loader/Loader';
import Petitions from '../../services/petitions';
import errorHandler from '../../helpers/errorHandler';
import '../../style/admin.scss';

class PetitionsModal extends Component {
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
    event.preventDefault();
    this.setState({ loading: true });
    const { hide } = this.props;
    const { formDetails } = this.state;
    formDetails.office = Number(formDetails.office);

    const petition = await Petitions.postPetition(formDetails);

    if (petition.status >= 400) {
      this.setState({ loading: false });
      notify.show(errorHandler(petition.error.message[0].error), 'error');
    }

    if (petition.status === 201) {
      this.setState({ loading: false });
      hide();
      notify.show('success');
    }
  };

  render() {
    const { formDetails, loading } = this.state;
    const { offices } = this.props;

    return (
      <React.Fragment>
        {loading && <Loader />}
        <div>
          <section className="modal-main">
            <form className="modal-form">
              <h3 className="page-modal-title">Petition</h3>
              <div className="fix">
                <span>Select an office to petition</span>
                <select id="office" onChange={this.onInputChange}>
                  <option disabled selected default>
                    -- Select Office --
                  </option>
                  {offices.map(obj => (
                    <option key={obj.id} name={obj.name} value={obj.id}>
                      {obj.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="fix">
                <span>Submit any piece of evidence</span>
                <input
                  type="text"
                  id="evidence"
                  placeholder="Enter link here"
                  value={formDetails.name}
                  onChange={this.onInputChange}
                  required
                />
              </div>
              <div className="fix">
                <span>Comments</span>
                <textarea
                  rows="4"
                  cols="50"
                  placeholder="Leave your comments here"
                  id="comment"
                  onChange={this.onInputChange}
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

export default PetitionsModal;
