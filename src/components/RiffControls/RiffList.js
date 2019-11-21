import React from 'react';
import { connect } from 'react-redux';
import RiffDetail from './RiffDetail.js';

/* this component maps over all of the user's riffs for this video */
function RiffList(props) {
  return (
    <div className="list-of-riffs">
      <h2 className="riff-list-title">Control Panel</h2>
      {props.riffs
        ? props.riffs.map((riff, index) => (
            <RiffDetail
              {...riff}
              index={index}
              selected={props.riffsPlaying[index] === true}
            />
          ))
        : null}
    </div>
  );
}

const mapStateToProps = state => ({
  riffs: state.riffs,
  riffsPlaying: state.riffsPlaying
});

export default connect(
  mapStateToProps,
  null
)(RiffList);
