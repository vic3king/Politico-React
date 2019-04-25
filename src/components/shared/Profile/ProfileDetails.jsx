import React from 'react';
import PropTypes from 'prop-types';

const ProfileDetails = ({ className }) => {
  return (
    <div className={className}>
      <p id="fullname">Fullname: akaniru victory</p>
      <p id="email">Email: victory@yahoo.com</p>
      <p id="phonenumber">Phonenumber: +234-445754784</p>
      <p id="type">Status: admin</p>
    </div>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string.isRequired,
};

export default ProfileDetails;
