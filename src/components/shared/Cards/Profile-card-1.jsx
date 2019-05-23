import React, { Component } from 'react';
import Button from '../Buttons/Button';
import '../../../style/profile.scss';
import capitalizer from '../../../helpers/capitalizer';

class ProfileTopSectionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { offices, value } = this.props;
    const listOfOffices = offices.map(office => (
      <div key={office.id} className="card">
        <h6>
          {capitalizer(office.name)}({capitalizer(office.type)})
        </h6>
        <p className="num">0</p>
        <Button
          className="admin-office-card"
          value={value}
          id="admin-office-card"
        />
      </div>
    ));

    return (
      <React.Fragment>
        <div id="grid">{listOfOffices}</div>
      </React.Fragment>
    );
  }
}

export default ProfileTopSectionCard;
