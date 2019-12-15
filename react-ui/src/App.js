import React from 'react';
import EditInterface from './components/RiffControls/EditInterface';
import ViewInterface from './components/ViewInterface/ViewInterface';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="App">
          <div className="top-section">
            <div className="title-and-url">
              <h1>RiffTube</h1>
            </div>
          </div>
          <div className="main-section">
            <Route
              exact path="/"
              component={EditInterface}
            />
            <Route
              path="/view/:videoID"
              component={ViewInterface}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;