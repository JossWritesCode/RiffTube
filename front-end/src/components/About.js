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
            <p>Q: Just what is RiffTube?</p>
            <p>
              A: RiffTube is a tool that allows you to add your voice to YouTube
              videos. Riffs are saved remotely, so your riffs can be shared with
              the world!
              <br />
            </p>
            <div
              style={{
                height: '1px',
                background: 'gray',
                width: '75%',
                margin: 'auto',
              }}
            />
            <p>
              Q: How are you so smart that you came up with this and made it?
            </p>
            <p>
              A: Years spent watching MST3k and learning to code.
              <br />
            </p>
            <div
              style={{
                height: '1px',
                background: 'gray',
                width: '75%',
                margin: 'auto',
              }}
            />
            <p>Q: How can I contact you with questions or issues?</p>
            <p>
              A: The best way to report technical issues is via the RiffTube{' '}
              <a href="https://github.com/JossWritesCode/RiffTube/issues">
                github repository
              </a>{' '}
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
            </p>
            <div
              style={{
                height: '1px',
                background: 'gray',
                width: '75%',
                margin: 'auto',
              }}
            />
            <p>Q: It's not working!</p>
            <p>
              A: If you have a Mac, check your Security &amp; Privacy settings
              in System Preferences. You need to make sure that your browser has
              permission to access to microphone.
              <br />
              <br />
              If that doesn't help, please email us or report the issue via
              github. Please include what kind of computer you are using
              (Windows, Mac, Android, iOS, Linux, etc.), and what browser
              (Chrome, FireFox, Edge, etc).
              <br />
            </p>
            <div
              style={{
                height: '1px',
                background: 'gray',
                width: '75%',
                margin: 'auto',
              }}
            />
            <p>Q: Why is Google sign in required?</p>
            <p>
              A: To identify specific users, and prevent abuse of the system.
              Your email address and other information will never be shared
              without your consent.
              <br />
            </p>
            <div
              style={{
                height: '1px',
                background: 'gray',
                width: '75%',
                margin: 'auto',
              }}
            />
            <p>Q: Do all YouTube videos work?</p>
            <p>
              A: Unfortunately, no. Only videos that allow embedding currently
              work with RiffTube.
              <br />
            </p>
            <div
              style={{
                height: '1px',
                background: 'gray',
                width: '75%',
                margin: 'auto',
              }}
            />

            <p>Q: Any plans?</p>
            <p>
              A: So many. All the plans. If you have a feature you'd like to
              see, please submit a request. It might already be in the works!
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
