import React from 'react';
import EditInterface from './components/RiffControls/EditInterface';
import ViewInterface from './components/ViewInterface/ViewInterface';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './components/About';
import Profile from './components/Profile';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="main-section">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/riff" component={EditInterface} />
              <Route path="/riff/:videoID" component={EditInterface} />
              <Route path="/about" component={About} />
              <Route path="/view/:videoID" component={ViewInterface} />
              <Route path="/profile" component={Profile} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
