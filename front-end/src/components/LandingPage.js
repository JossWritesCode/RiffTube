import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from './NavBar.js';
import MaterialIcon from 'material-icons-react';
import MovieImage from '../images/undraw_movie_night_93wl.svg';

const LandingPage = () => (
  <div className="landing-page">
    <NavBar color="grey" />
    <section className="top-part">
      <div className="heading">
        <span className="heading-primary-main">RiffTube</span>
        <span className="heading-primary-sub">
          Add Your Voice to YouTube Videos
        </span>
        <Link to="/riff" className="get-started-btn btn">
          Get Started &#8594;
        </Link>
      </div>
      <img alt="movie theater" className="movie-image" src={MovieImage}></img>
    </section>
    <section className="middle-part">
      <div className="middle-text">
        <h3>Riffing for the Riff Raff</h3>
      </div>
      <div className="about">
        <div className="about-text">
          <p>
            In the glorious tradition of Mystery Science Theater 3000, The Film
            Crew, RiffTrax, Cinematic Titanic, MST3k again, and others...
          </p>
          <p>
            Now presenting: <em>you!</em>
          </p>
          <p>
            RiffTube allows you to add your own riffs to any video on YouTube.
          </p>
        </div>
      </div>
      <div className="features">
        <div className="feature feature-one">
          <MaterialIcon icon="mic" color="#a41320" size="medium" />
          <p>Record your voice</p>
        </div>
        <div className="feature feature-two">
          <MaterialIcon icon="edit" color="#a41320" size="medium" />
          <p>Edit your recordings</p>
        </div>
        <div className="feature feature-three">
          <MaterialIcon icon="people" color="#a41320" size="medium" />
          <p>Add your friends' voices</p>
        </div>
        <div className="feature feature-three">
          <MaterialIcon icon="share" color="#a41320" size="medium" />
          <p>Share with anybody</p>
        </div>
      </div>
    </section>
    <section className="bottom-part">
      <footer className="landing-footer">
        Copyright © 2020 - All rights reserved
      </footer>
    </section>
  </div>
);

export default LandingPage;
