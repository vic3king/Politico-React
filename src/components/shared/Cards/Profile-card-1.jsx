import React, { Component } from 'react';
import Button from '../Buttons/Button';
import '../../../style/profile.scss';
import Offices from '../../../services/offices';
import Loader from '../Loader/Loader';
import capitalizer from '../../../helpers/capitalizer';

class ProfileTopSectionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offices: [],
      loading: true,
    };
  }

  componentDidMount = async () => {
    const allOffices = await Offices.getAllOffices();
    this.setState({ offices: allOffices.data, loading: false });
  };

  render() {
    const { offices, loading } = this.state;
    const listOfOffices = offices.map(office => (
      <div key={office.id} className="card">
        <h6>
          {capitalizer(office.name)}({capitalizer(office.type)})
        </h6>
        <p className="num">0</p>
        <Button id="admin-office-card" value="View" />
      </div>
    ));

    return (
      <React.Fragment>
        {loading && <Loader />}
        <div id="grid">{listOfOffices}</div>
      </React.Fragment>
    );
  }
}

export default ProfileTopSectionCard;
