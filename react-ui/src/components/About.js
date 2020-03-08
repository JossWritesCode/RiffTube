import React from 'react';
import MovieImage from '../images/undraw_movie_night_93wl.svg';
import MaterialIcon from 'material-icons-react';
import { NavLink } from 'react-router-dom';
import HorrorMovie from '../images/undraw_horror_movie_3988.svg';
import NavBar from './NavBar.js';

function About() {
  return (
    <div className="landing-page">
      <NavBar color="white" />
      <section className="middle-part" style={{ height: 'initial' }}>
        <div className="middle-text">
          <h3>About RiffTube</h3>
          <p>or: How I Learned to Stop Worrying and Love RiffTube</p>
        </div>
        <h2>Developers:</h2>
        <div className="features">
          <div className="feature feature-one" style={{ width: 'initial' }}>
            <img src="/joss.jpg" alt="Joss!" style={{ borderRadius: '50%' }} />

            <p>Joscelyn!</p>
          </div>
          <div className="feature feature-two" style={{ width: 'initial' }}>
            <img
              src="/david.jpg"
              alt="David!"
              style={{ borderRadius: '50%' }}
            />

            <p>David!</p>
          </div>
        </div>
        <div
          className="about"
          style={{ backgroundColor: 'white', width: '100%', color: 'black' }}
        >
          <div className="about-text">
            <h2>Q&amp;A</h2>
            <p>
              Q: How are you so smart that you came up with this and made it?
            </p>
            <p>
              A: Years spent watching MST3k, and learning to code.
              <br />
              <br />
            </p>
            <p>Q: How can I contact you with questions or issues?</p>
            <p>
              A: The best way to report technical issues is via the RiffTube
              github repository{' '}
              <a href="https://github.com/JossWritesCode/RiffTube/issues">
                issue tracker
              </a>
              <br />
              You can also email us:{' '}
              <a href="mailto:grokprogramming@gmail.com">
                grokprogramming@gmail.com
              </a>
              .
              <br />
              <br />
            </p>
            <p>Q: Why is Google sign in required?</p>
            <p>
              A: Simply as a way to track who owns (and can therefore edit or
              delete) riffs.
              <br />
              <br />
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

export default About;
