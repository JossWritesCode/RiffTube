import React from 'react';
import MovieImage from '../images/undraw_movie_night_93wl.svg';
import Icon from '@material-ui/core/Icon';
import MicIcon from '@material-ui/icons/Mic';
import MaterialIcon, { colorPalette } from 'material-icons-react';
import { NavLink } from 'react-router-dom';
import HorrorMovie from '../images/undraw_horror_movie_3988.svg';

function LandingPage() {
  return (
    <div className="landing-page">
      <section className="top-part">
        <div className="heading">
          <span className="heading-primary-main">RiffTube</span>
          <span className="heading-primary-sub">Riffing for the Riff-Raff</span>
          <NavLink to="/riff" className="get-started-btn btn">
            Get Started &#8594;
          </NavLink>
        </div>
        <img className="movie-image" src={MovieImage}></img>
      </section>
      <section className="middle-part">
        <div className="middle-text">
          <h3>Easy Audio Commentary</h3>
          <p>
            Add commentary to YouTube videos without bulky, expensive software.
          </p>
        </div>
        <div className="features">
          <div className="feature feature-one">
            <MaterialIcon icon="mic" color="#a41320" size="medium" />

            <p>Add your voice to a video on YouTube</p>
          </div>
          <div className="feature feature-two">
            <MaterialIcon icon="edit" color="#a41320" size="medium" />

            <p>Edit your recordings until they're just right</p>
          </div>
          <div className="feature feature-three">
            <MaterialIcon icon="people" color="#a41320" size="medium" />

            <p>Add your friends' voices to the recording</p>
          </div>
          <div className="feature feature-three">
            <MaterialIcon icon="share" color="#a41320" size="medium" />

            <p>Get a link to share your annotated YouTube video with anybody</p>
          </div>
        </div>
        <div className="about">
          <div className="about-text">
            <h2>About RiffTube</h2>
            <p>
              In the glorious tradition of Mystery Science Theater 3000, The
              Film Crew, RiffTrax, Cinematic Titanic, MST3k again, and others...
              <br />
              Now presenting: <em>you!</em>
            </p>
            <p>
              RiffTube allows you to add your own riffs to any video on YouTube.
            </p>
          </div>
          <div>
            <img className="horror-movie-image" src={HorrorMovie} />
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
}

export default LandingPage;
