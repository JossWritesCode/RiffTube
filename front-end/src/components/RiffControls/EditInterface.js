import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import YouTubeVideo from '../YouTubeVideo/YouTubeVideo';
import Login from '../Login/Login';
import EditControls from './EditControls';
import {
  setVideoID,
  setWebSocket,
  getRiffsMeta,
  getRiffs,
  setRecorder,
} from '../../actions';
import MetaBar from '../MetaBar';
import NavBar from '../NavBar.js';

class EditInterface extends React.Component {
  constructor(props) {
    super(props);
    this.videoIDRef = React.createRef();
  }

  componentDidMount = () => {
    if (this.props.match.params.videoID) {
      this.props.setVideoID(
        this.props.match.params.videoID,
        this.props.googleUser
      );
      this.videoIDRef.current.value = this.props.match.params.videoID;
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.match.params.videoID !== this.props.videoID) {
      this.props.setVideoID(
        this.props.match.params.videoID,
        this.props.googleUser
      );
      this.videoIDRef.current.value = this.props.match.params.videoID;
    }

    if (
      this.loggedIn() &&
      this.props.videoID &&
      this.props.googleUser !== prevProps.googleUser
    ) {
      this.props.getRiffs(this.props.videoID, this.props.googleUser);
    }

    if (
      this.loggedIn() &&
      (!this.props.websocket || this.props.videoID !== prevProps.videoID)
    ) {
      //const websocket = new WebSocket( `ws://localhost:3300/riff?videoID=${this.props.match.params.videoID}&googleToken=${this.props.googleUser.getAuthResponse().id_token}` );
      var baseURL;
      if (process.env.NODE_ENV === 'production')
        baseURL = 'wss://rifftube.herokuapp.com';
      else baseURL = 'ws://localhost:3300';

      const websocket = new WebSocket(
        `${baseURL}/riff?videoID=${
          this.props.match.params.videoID
        }&googleToken=${this.props.googleUser.getAuthResponse().id_token}`
      );
      websocket.onmessage = (event) => {
        console.log(event.data);

        const msg = JSON.parse(event.data);

        if (msg.video_id === this.props.videoID && msg.type === 'update')
          this.props.getRiffsMeta(this.props.videoID);
      };
      this.props.setWebSocket(websocket);
    }
  };

  loggedIn = () => {
    if (this.props.googleUser) return this.props.googleUser.isSignedIn();

    return false;
  };

  authCheck = (Component, DefaultComponent) => {
    return this.loggedIn() ? <Component /> : <DefaultComponent />;
  };
  /* extracts the youtube id from a url. got help from: https://ctrlq.org/code/19797-regex-youtube-id */
  extractVideoID = (url) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length === 11) {
      return match[7];
    } else {
      return url; // if extraction fails, fallback on assuming they gave an ID
    }
  };

  render() {
    return this.props.match.params.videoID ? (
      <React.Fragment>
        <NavBar color="grey" />
        <div className="youtube-section">
          <div className="top-section">
            <div className="title-and-url">
              <h1 className="heading-primary-main">RiffTube</h1>
            </div>
          </div>
          <h4 className="get-started-instructions">
            {this.loggedIn() ? null : (
              <React.Fragment>
                <Login /> <p>to get started</p>
              </React.Fragment>
            )}
          </h4>
          <label>Paste any YouTube URL here &#8594; </label>
          <input
            type="text"
            defaultValue={this.props.videoID}
            ref={this.videoIDRef}
          />
          <button className="btn" id="change-video-btn" onClick={(e) => {
              const vID = this.extractVideoID(this.videoIDRef.current.value);

              this.props.history.push(`/riff/${vID}`);

              this.props.setVideoID(vID, this.props.googleUser);
            }}>
            Change Video
          </button>
          <YouTubeVideo id={this.props.videoID} riffs={this.props.riffs} />
          <MetaBar />
          <div className="view-share-riff-link">
            <a
              href={
                '/view/' +
                this.props.videoID +
                (this.props.user_id ? '?solo=' + this.props.user_id : '')
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              View &amp; Share Riffed Video
            </a>
          </div>
        </div>
        {this.loggedIn() ? <EditControls /> : null}
      </React.Fragment>
    ) : (
      <Redirect to={`/riff/${this.props.videoID}`} />
    );
  }
}

const mapStateToProps = (state) => ({
  riffs: state.riffs.all,
  videoID: state.videoID,
  googleUser: state.googleUser,
  user_id: state.user_id,
  websocket: state.websocket,
  recorder: state.recorder,
});

const mapDispatchToProps = {
  setVideoID,
  setWebSocket,
  getRiffsMeta,
  getRiffs,
  setRecorder,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInterface);
