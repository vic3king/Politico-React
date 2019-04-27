import React, { Component } from 'react';

class DeletePartModal extends Component {
  hide = e => {
    e.preventDefault();
    const { hide } = this.props;
    hide();
  };

  render() {
    return (
      <div className="modalDelete">
        <p>Are you sure you want to delete?</p>
        <button type="submit" className="modalyes">
          Yes
        </button>
        <button type="submit" className="modalno">
          No
        </button>
        <button type="button" className="modal-close" onClick={this.hide}>
          X
        </button>
      </div>
    );
  }
}

export default DeletePartModal;
