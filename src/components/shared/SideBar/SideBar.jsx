import React from 'react';
import PropTypes from 'prop-types';
import '../../../style/sidebar.scss';
import ProfileImage from '../Profile/ProfileImage';
import ProfileDetails from '../Profile/ProfileDetails';

const SideBar = ({ ButtonOne, ButtonTwo, ButtonThree, ButtonFour, user }) => {
  return (
    <React.Fragment>
      <div className="profile sidenav toggle">
        <ProfileImage className="profile__image" />
        <ProfileDetails className="profile__details" user={user} />
        <br />
        <br />
        {ButtonOne}
        <br />
        <br />
        <br />
        {ButtonTwo}
        <br />
        <br />
        <br />
        {ButtonFour}
        <br />
        <br />
        <br />
        {ButtonThree}
      </div>
    </React.Fragment>
  );
};

SideBar.defaultProps = {
  ButtonOne: (PropTypes.defaultProps = ''),
  ButtonTwo: (PropTypes.defaultProps = ''),
  ButtonThree: (PropTypes.defaultProps = ''),
  ButtonFour: (PropTypes.defaultProps = ''),
};

SideBar.propTypes = {
  ButtonOne: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  ButtonTwo: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  ButtonThree: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  ButtonFour: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default SideBar;
