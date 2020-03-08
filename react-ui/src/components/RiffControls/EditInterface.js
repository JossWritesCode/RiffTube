import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import YouTubeVideo from '../YouTubeVideo/YouTubeVideo';
import Login from '../Login/Login';
import EditControls from './EditControls';
import { setVideoID } from '../../actions';
import { NavLink } from 'react-router-dom';
import MetaBar from '../MetaBar';
import NavBar from '../NavBar.js';

class EditInterface extends React.Component {
  constructor(props) {
    super(props);
    this.videoIDRef = React.createRef();
  }

  loggedIn = () => {
    if (this.props.googleUser) return this.props.googleUser.isSignedIn();

    return false;
  };

  authCheck = (Component, DefaultComponent) => {
    return this.loggedIn() ? <Component /> : <DefaultComponent />;
  };
  /* extracts the youtube id from a url. got help from: https://ctrlq.org/code/19797-regex-youtube-id */
  extractVideoID = url => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length === 11) {
      return match[7];
    } else {
      return url; // if extraction fails, fallback on assuming they gave an ID
    }
  };

  render() {
    return (
      <React.Fragment>
        <NavBar color="grey" />
        <div className="youtube-section">
          <div className="top-section">
            <div className="title-and-url">
              <h1>RiffTube</h1>
            </div>
          </div>
          <h4 className="get-started-instructions">
            <Route
              exact
              path="/riff"
              render={() => {
                return this.loggedIn() ? null : (
                  <React.Fragment>
                    <Login /> <p>to get started</p>
                  </React.Fragment>
                );
              }}
            />
          </h4>
          <form
            onSubmit={e => {
              this.props.setVideoID(
                this.extractVideoID(this.videoIDRef.current.value),
                this.props.googleUser
              );
              e.preventDefault();
            }}
          >
            <label>Paste any YouTube URL here &#8594; </label>
            <input
              type="text"
              defaultValue={this.props.videoID}
              ref={this.videoIDRef}
            />
            <button className="btn" id="change-video-btn" type="submit">
              Change Video
            </button>
          </form>
          <YouTubeVideo id={this.props.videoID} />
          <MetaBar />
          <div className="view-share-riff-link">
            <a
              href={'/view/' + this.props.videoID}
              target="_blank"
              rel="noopener noreferrer"
            >
              View &amp; Share Riffed Video
            </a>
          </div>
        </div>
        <Route
          exact
          path="/riff"
          render={() => {
            return this.loggedIn() ? <EditControls /> : null;
          }}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  videoID: state.videoID,
  googleUser: state.googleUser
});

const mapDispatchToProps = {
  setVideoID
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInterface);
