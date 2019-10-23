import React, { useState } from 'react';
import './App.css';
import Video from './components/Video.js';
import Login from './components/Login.js';
import EditControls from './components/EditControls.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [videoUrl, setVideoUrl] = useState('tgbNymZ7vqY');

  const handleChange = event => {
    setVideoUrl(event.target.value);
  };

  const [googleUser, setGoogleUser] = useState(null);

  const loggedIn = () => {
    if (googleUser) {
      return googleUser.isSignedIn();
    }
    return false;
  };

  const authCheck = (props, Component, props2, DefaultComponent) => {
    return loggedIn() ? <Component {...props} /> : <DefaultComponent {...props2} />;
  };

  return (
    <Router>
      <div className="App">

        <form>
          <label>
            Your Youtube Video:
            <input
              type="text"
              name="videoUrl"
              value={videoUrl}
              onChange={event => handleChange(event)}
            />
          </label>
        </form>

        <Video videoUrl={videoUrl} />

        <Switch>
          <Route exact path="/" render={authCheck.bind(this, {}, EditControls, {setUser: (val => {setGoogleUser(val)})}, Login )} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
