import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../../style/sidebar.scss';
import ProfileImage from '../Profile/ProfileImage';
import ProfileDetails from '../Profile/ProfileDetails';

const SideBar = ({ ButtonOne, ButtonTwo, ButtonThree, to, user }) => {
  return (
    <React.Fragment>
      <div className="profile sidenav">
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
        <Link to={to}>{ButtonThree}</Link>
      </div>
    </React.Fragment>
  );
};

SideBar.defaultProps = {
  ButtonOne: (PropTypes.defaultProps = ''),
  ButtonTwo: (PropTypes.defaultProps = ''),
  ButtonThree: (PropTypes.defaultProps = ''),
};

SideBar.propTypes = {
  ButtonOne: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  ButtonTwo: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  ButtonThree: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  to: PropTypes.string.isRequired,
};

export default SideBar;
