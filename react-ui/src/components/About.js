import React from 'react';

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
              Q: Just what is RiffTube?
            </p>
            <p>
              A: RiffTube is a tool that allows you to add your voice to YouTube videos.
              <br />
              <br />
            </p>
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

            <h2>Could you be more specific?</h2>
            <p>
              Q: What is this thing, again?
            </p>
            <p>
              A: RiffTube allows you to record riffs for YouTube videos.
              Each video has a special RiffTube viewing URL.
              When viewing a video on RiffTube, everyone's riffs are combined
              into one giant communal riff.
              <br />
              <br />
            </p>
            <p>Q: Do any YouTube videos not work?</p>
            <p>
              A: Unfortunately, yes. Only videos that allow embedding
              currently work with RiffTube.
              <br />
              <br />
            </p>

          </div>
          <div>
            <img
              alt="people watching a movie"
              className="horror-movie-image"
              src={HorrorMovie}
            />
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
