import React from 'react';
import { connect } from 'react-redux'

function Video({videoID}) {
  return (
    <iframe
      title="video"
      width="420"
      height="315"
      src={`https://www.youtube.com/embed/${videoID}`}
    ></iframe>
  );
}

const mapStateToProps = state => ({
  videoID: state.videoID
});

export default connect(
  mapStateToProps,
  null
)(Video);