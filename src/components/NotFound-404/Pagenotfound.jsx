import React from 'react';
import NavBar from '../shared/NavBar/Navbar';
import Footer from '../shared/Footer/Footer';
import LiTag from '../shared/Buttons/LI-tag';
import '../../style/home-page.scss';
import errorImage from '../../assets/images/7iJI.gif';

const ErrorPage = () => {
  return (
    <React.Fragment>
      <NavBar>
        <LiTag to="/signup" value="Sign Up" />
        <LiTag to="/login" value="Login" />
      </NavBar>
      <section id="showcase">
        <img src={errorImage} alt="" />
        <div className="overlay" />
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default ErrorPage;
