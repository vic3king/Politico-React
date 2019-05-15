import React from 'react';
import PropTypes from 'prop-types';

const ProfileDetails = ({ className, user }) => {
  return (
    <div className={className}>
      <p id="fullname">
        Fullname: {`${user.firstname} ${user.lastname} ${user.othernames}`}
      </p>
      <p id="email">Email: {user.email}</p>
      <p id="phonenumber">Phonenumber: {user.phonenumber}</p>
      <p id="typ">Status: {user.type}</p>
    </div>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string.isRequired,
};

export default ProfileDetails;
