import React, { Component } from 'react';

class DeletePartModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  hide = e => {
    e.preventDefault();
    const { hide } = this.props;
    hide();
  };

  handleDelete = e => {
    e.preventDefault();
    const { handleDelete } = this.props;
    handleDelete();
  };

  render() {
    return (
      <React.Fragment>
        <div className="modalDelete">
          <p>Are you sure you want to delete?</p>
          <button
            onClick={this.handleDelete}
            type="submit"
            className="modalyes"
          >
            Yes
          </button>
          <button type="submit" className="modalno" onClick={this.hide}>
            No
          </button>
          <button type="button" className="modal-close" onClick={this.hide}>
            X
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default DeletePartModal;
