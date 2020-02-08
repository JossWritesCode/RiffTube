import React from 'react';
import EditInterface from './components/RiffControls/EditInterface';
import ViewInterface from './components/ViewInterface/ViewInterface';
import LandingPage from './components/LandingPage.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="main-section">
            <Route exact path="/" component={LandingPage} />
            <Route path="/riff" component={EditInterface} />
            <Route path="/view/:videoID" component={ViewInterface} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
