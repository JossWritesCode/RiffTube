import React from 'react';

function Video(props) {
  return (
    <iframe
      title="video"
      width="420"
      height="315"
      src={`https://www.youtube.com/embed/${props.videoUrl}`}
    ></iframe>
  );
}

export default Video;
