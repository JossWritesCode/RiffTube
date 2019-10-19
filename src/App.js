import React, { useState } from 'react';
import './App.css';
import Video from './components/Video.js'

function App() {
  const [videoUrl, setVideoUrl] = useState('tgbNymZ7vqY');

  /* comment */

  const handleChange = event => {
    setVideoUrl(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('hello');
  };

  return (
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
 
    </div>
  );
}

export default App;
