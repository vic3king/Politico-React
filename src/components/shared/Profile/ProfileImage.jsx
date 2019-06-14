import React from 'react';
import PropTypes from 'prop-types';

const ProfileImage = ({ className }) => {
  return <div className={className} />;
};

ProfileImage.propTypes = {
  className: PropTypes.string.isRequired,
};
export default ProfileImage;
