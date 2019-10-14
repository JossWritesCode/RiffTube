import React, { useState } from 'react';

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
        src={`https://www.youtube.com/embed/${videoUrl}`}
      ></iframe>
    </div>
  );
}

export default App;
