import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Video from './components/Video.js';
import Login from './components/Login.js';
import EditControls from './components/EditControls.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App(props) {
  const loggedIn = () => {
    if (props.googleUser) {
      return props.googleUser.isSignedIn();
    }
    return false;
  };

  const authCheck = (Component, DefaultComponent) => {
    return loggedIn() ? <Component /> : <DefaultComponent />;
  };

  return (
    <Router>
      <div className="App">
        <form>
          <label>
            Your Youtube Video:
            <input type="text" name="videoUrl" value={props.videoID} />
          </label>
        </form>

        <Video />

        <Switch>
          <Route
            exact
            path="/"
            render={authCheck.bind(this, EditControls, Login)}
          />
        </Switch>
      </div>
    </Router>
  );
}

<<<<<<< HEAD
const mapStateToProps = state => ({
  videoID: state.videoID,
  googleUser: state.googleUser
});
||||||| merged common ancestors
const mapStateToProps = state => ({ videoID: state.videoID, googleUser: state.googleUser });
=======
const mapStateToProps = state => (
  {
    videoID: state.videoID,
    googleUser: state.googleUser
  }
);
>>>>>>> 1588a023a56cb7d6138b7440187e6d8ad223874f

export default connect(
  mapStateToProps,
  null
)(App);
