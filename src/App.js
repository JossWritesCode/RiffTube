import React, { useState } from 'react';
import './App.css';
import Video from './components/Video.js';
import Login from './components/Login.js';
import Header from './components/Header.js';
import EditControls from './components/EditControls.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [videoUrl, setVideoUrl] = useState('tgbNymZ7vqY');

  const handleChange = event => {
    setVideoUrl(event.target.value);
  };

  const [googleUser, setGoogleUser] = useState(null);

  const loggedIn = () => {
    debugger;
    if (googleUser) {
      return googleUser.isSignedIn();
    }
    return false;
  };

  const authCheck = (props, Component) => {
    debugger;
    return loggedIn() ? <Component {...props} /> : <Header />;
  };

  return (
    <Router>
      <div className="App">
        <Login setUser={(val, val2, val3, val4) => {debugger; setGoogleUser(val)}} />

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
          <Route exact path="/" render={authCheck.bind(this, EditControls)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
