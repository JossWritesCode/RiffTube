import React from 'react';
import HorrorMovie from '../images/undraw_horror_movie_3988.svg';
import NavBar from './NavBar.js';

const About = () => (
  <div className="landing-page">
    <NavBar color="white" />
    <section className="middle-part" style={{ height: 'initial' }}>
      <div className="middle-text">
        <h1
          style={{ color: 'white', marginTop: '6rem' }}
          className="heading-primary-main"
        >
          About RiffTube
        </h1>
        <p>or: How I Learned to Stop Worrying and Love RiffTube</p>
      </div>
      <h2>Developers:</h2>
      <div className="features">
        <div className="feature feature-one" style={{ width: 'initial' }}>
          <img src="/joss.jpg" alt="Joss!" style={{ borderRadius: '50%' }} />

          <p className="heading-name">Joscelyn!</p>
        </div>
        <div className="feature feature-two" style={{ width: 'initial' }}>
          <img src="/david.jpg" alt="David!" style={{ borderRadius: '50%' }} />

          <p className="heading-name">David!</p>
        </div>
      </div>
      <div
        className="about"
        style={{ backgroundColor: 'white', width: '100%', color: 'black' }}
      >
        <div className="about-text">
          <h2 className="heading-qa">Q&amp;A</h2>
          <p className="question">Q: Just what is RiffTube?</p>
          <p className="answer">
            RiffTube is a tool that allows you to add your voice to YouTube
            videos. Riffs are saved remotely, so your riffs can be shared with
            the world!
          </p>
          <div
            style={{
              height: '1px',
              background: 'gray',
              width: '75%',
              margin: 'auto',
            }}
          />
          <p className="question">
            Q: How are you so smart that you came up with this and made it?
          </p>
          <p className="answer">
            Years spent watching MST3k and learning to code.
          </p>
          <div
            style={{
              height: '1px',
              background: 'gray',
              width: '75%',
              margin: 'auto',
            }}
          />
          <p className="question">Q: Where are the riffs stored?</p>
          <p className="answer">
            The are stored on a server, not your computer.
          </p>
          <div
            style={{
              height: '1px',
              background: 'gray',
              width: '75%',
              margin: 'auto',
            }}
          />
          <p className="question">
            Q: How can I contact you with questions or issues?
          </p>
          <p className="answer">
            The best way to report technical issues is via the RiffTube{' '}
            <a href="https://github.com/JossWritesCode/RiffTube/issues">
              github repository
            </a>{' '}
            <a href="https://github.com/JossWritesCode/RiffTube/issues">
              issue tracker.{' '}
            </a>
            You can also email us:{' '}
            <a href="mailto:grokprogramming@gmail.com">
              grokprogramming@gmail.com
            </a>
            .
          </p>
          <div
            style={{
              height: '1px',
              background: 'gray',
              width: '75%',
              margin: 'auto',
            }}
          />
          <p className="question">Q: It's not working!</p>
          <p className="answer">
            If you have a Mac, check your Security &amp; Privacy settings in
            System Preferences. You need to make sure that your browser has
            permission to access to microphone. If that doesn't help, please
            email us or report the issue via github. Please include what kind of
            computer you are using (Windows, Mac, Android, iOS, Linux, etc.),
            and what browser (Chrome, FireFox, Edge, etc).
          </p>
          <div
            style={{
              height: '1px',
              background: 'gray',
              width: '75%',
              margin: 'auto',
            }}
          />
          <p className="question">Q: Why is Google sign in required?</p>
          <p className="answer">
            To identify specific users, and prevent abuse of the system. Your
            email address and other information will never be shared without
            your consent.
          </p>
          <div
            style={{
              height: '1px',
              background: 'gray',
              width: '75%',
              margin: 'auto',
            }}
          />
          <p className="question">Q: Do all YouTube videos work?</p>
          <p className="answer">
            Unfortunately, no. Only videos that allow embedding currently work
            with RiffTube.
          </p>
          <div
            style={{
              height: '1px',
              background: 'gray',
              width: '75%',
              margin: 'auto',
            }}
          />

          <p className="question">Q: Any plans?</p>
          <p className="answer">
            So many. All the plans. If you have a feature you'd like to see,
            please submit a request. It might already be in the works!
          </p>
          <div
            style={{
              height: '1px',
              background: 'gray',
              width: '75%',
              margin: 'auto',
            }}
          />

          <p className="question">Q: What's your privacy policy?</p>
          <p className="answer">
            RiffTube does not display, sell, or transmit any personal information publically or to any 3rd party.
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
        Copyright © 2022 - All rights reserved
      </footer>
    </section>
  </div>
);

export default About;
