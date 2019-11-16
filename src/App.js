import React from 'react';
import { connect } from 'react-redux';
import YouTubeVideo from './components/YouTubeVideo/YouTubeVideo.js';
import Login from './components/Login/Login.js';
import EditControls from './components/RiffControls/EditControls.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setVideoID } from './actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.videoIDRef = React.createRef();
  }

  loggedIn = () => {
    if (this.props.googleUser) {
      return this.props.googleUser.isSignedIn();
    }
    return false;
  };

  authCheck = (Component, DefaultComponent) => {
    return this.loggedIn() ? <Component /> : <DefaultComponent />;
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div style={ { backgroundColor: '#A41320', color: 'white', padding: '1em' } }>
            <h1 style={ { textAlign: 'center', fontFamily: "'Limelight'", margin: 0 } }>RiffTube</h1>
            <form onSubmit={ e => { this.props.setVideoID( this.videoIDRef.current.value ); e.preventDefault(); } }>
              <label>
                YouTube URL/ID:&nbsp;&nbsp;
              </label>
              <input
                type="text"
                defaultValue={this.props.videoID}
                ref={this.videoIDRef}
              />
              <button
                type="button"
                onClick={e => {
                  this.props.setVideoID(this.videoIDRef.current.value);
                }}
              >
                Change Video
              </button>
            </form>
          </div>

          <div style={ { backgroundColor: '#A41320' } }>
            <YouTubeVideo />
          </div>

          <Switch>
            <Route
              exact
              path="/"
              render={this.authCheck.bind(this, EditControls, Login)}
            />
          </Switch>
        </div>
      </Router>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
