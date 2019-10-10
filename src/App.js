import React, { useState } from 'react';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');

  const handleChange = event => {
    setVideoUrl(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(videoUrl);
  };

  return (
    <div className="App">
      {console.log(videoUrl)}
      <form onSubmit={event => handleSubmit(event)}>
        <label>
          Your Youtube Video:
          <input
            type="text"
            name="videoUrl"
            value={videoUrl}
            onChange={event => handleChange(event)}
          />
        </label>
        <button>Submit!</button>
      </form>
      <iframe
        title="video"
        width="420"
        height="315"
        src="https://www.youtube.com/embed/tgbNymZ7vqY"
      ></iframe>
    </div>
  );
}

export default App;
