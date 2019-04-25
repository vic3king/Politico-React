import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../style/modal.scss';

class OfficeModal extends Component {
  hide = e => {
    e.preventDefault();
    const { hide } = this.props;
    hide();
  };

  render() {
    return (
      <section className="modal-main">
        <form className="modal-form">
          <h3 className="page-modal-title">Create a Political Office:</h3>
          <div className="fix">
            <span>Office Type: </span>
            <select id="selecttype">
              <option value="federal" id="citizen">
                federal
              </option>
              <option value="legislative" id="politician">
                legislative
              </option>
              <option value="state" id="state">
                state
              </option>
              <option value="local-government" id="politician">
                local-government
              </option>
            </select>
          </div>
          <div className="fix">
            <span>Office: </span>
            <input
              type="text"
              id="officename"
              placeholder="e.g Local government Chairman"
              name="type"
              required
            />
          </div>
          <div className="fix">
            <span>AgeLimit: </span>
            <input type="number" id="age" required />
          </div>
          <button type="submit" className="cte-off">
            Create office
          </button>
          <button type="submit" id="btn" onClick={this.hide}>
            X
          </button>
        </form>
      </section>
    );
  }
}

OfficeModal.propTypes = {
  hide: PropTypes.func.isRequired,
};

export default OfficeModal;
