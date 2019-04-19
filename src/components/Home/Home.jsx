/* eslint-disable react/button-has-type */
import React from 'react';
import NavBar from '../shared/NavBar/Navbar';
import Footer from '../shared/Footer/Footer';
import Button from '../shared/Buttons/Button';
import '../../style/home-page.scss';
import electionVoteBallot from '../../assets/images/election-vote-ballot.jpg';

const HomePage = () => {
  return (
    <React.Fragment>
      <NavBar />
      <section className="showcase">
        <img src={electionVoteBallot} alt="" />
        <div className="overlay" />
      </section>
      <div className="centered">
        <h1> Get Nigeria working Again </h1>
        <p className="text">Be the change you want to see</p>
        <a href="signup.html">
          <Button className="button1" value="Vote Now" />
        </a>
        <a href="login.html">
          <Button className="button1" value="Run for Office" />
        </a>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;
