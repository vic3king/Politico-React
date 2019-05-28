import React, { Component } from 'react';
import Button from '../Buttons/Button';
import '../../../style/profile.scss';
import capitalizer from '../../../helpers/capitalizer';
import '../../../style/intrests-requests.scss';

class ProfileTopSectionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      officesPerPage: 6,
    };
  }

  handlePageClick = event => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  render() {
    const { offices, value, handleEvent } = this.props;
    const { currentPage, officesPerPage } = this.state;

    // Logic for displaying offices
    const indexOfLastOffice = currentPage * officesPerPage;
    const indexOfFirstOffice = indexOfLastOffice - officesPerPage;
    const currentOffices = offices.slice(indexOfFirstOffice, indexOfLastOffice);

    // Logic for displaying page numbers
    const pageNumbers = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= Math.ceil(offices.length / officesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <Button
          type="submit"
          key={number}
          id={number}
          value={number}
          onClick={this.handlePageClick}
        />
      );
    });

    const listOfOffices = currentOffices.map(office => (
      <div key={office.id} className="card">
        <p>
          <b>Name of Office:</b> {capitalizer(office.name)}
        </p>
        <p>
          <b>Type of Office:</b> {capitalizer(office.type)}
        </p>
        <p>
          <b>Description: </b> Lorem Ipsum is simply dummy text of the printing
          and typesetting an unknown printer took a galley of type and scrambled
          it to make a type specimen book...
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            className="admin-office-card"
            value={value}
            id={office.id}
            onClick={handleEvent}
          />
        </div>
      </div>
    ));

    return (
      <React.Fragment>
        <div id="grid">{listOfOffices}</div>
        <div className="middle">
          <div id="page-numbers" className="pagination">
            {renderPageNumbers}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileTopSectionCard;
