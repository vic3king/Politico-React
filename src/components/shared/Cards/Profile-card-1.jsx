import React from 'react';
import PropTypes from 'prop-types';
import '../../../style/profile.scss';

const ProfileTopSectionCard = ({ Button }) => {
  return (
    <React.Fragment>
      <div id="grid">
        <div className="card">
          <h6>Local Government Chairman</h6>
          <p className="num">0</p>
          {Button}
        </div>
        <div className="card">
          <h6>Local Government Chairman</h6>
          <p className="num">0</p>
          {Button}
        </div>
        <div className="card">
          <h6>Local Government Chairman</h6>
          <p className="num">0</p>
          {Button}
        </div>
        <div className="card">
          <h6>Local Government Chairman</h6>
          <p className="num">0</p>
          {Button}
        </div>
        <div className="card">
          <h6>Local Government Chairman</h6>
          <p className="num">0</p>
          {Button}
        </div>
        <div className="card">
          <h6>Local Government Chairman</h6>
          <p className="num">0</p>
          {Button}
        </div>
      </div>
    </React.Fragment>
  );
};

ProfileTopSectionCard.defaultProps = {
  Button: (PropTypes.defaultProps = ''),
};

ProfileTopSectionCard.propTypes = {
  Button: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default ProfileTopSectionCard;
