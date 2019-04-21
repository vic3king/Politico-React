import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../shared/NavBar/Navbar';
import Footer from '../shared/Footer/Footer';
import Button from '../shared/Buttons/Button';
import LiTag from '../shared/Buttons/LI-tag';
import '../../style/home-page.scss';
import electionVoteBallot from '../../assets/images/election-vote-ballot.jpg';

const HomePage = () => {
  return (
    <React.Fragment>
      <NavBar
        LiTagOne={<LiTag to="/signup" value="Sign Up" />}
        LiTagTwo={<LiTag to="/login" value="Login" />}
      />
      <section id="showcase">
        <img src={electionVoteBallot} alt="" />
        <div className="overlay" />
      </section>
      <div className="centered">
        <h1> Get Nigeria working Again </h1>
        <p className="text">Be the change you want to see</p>
        <Link to="/login">
          <Button id="button1" value="Vote Now" />
        </Link>
        <Link to="/signup">
          <Button id="button2" value="Run for Office" />
        </Link>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;
