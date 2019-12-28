import React from 'react';
import { connect } from 'react-redux';
import RiffDetail from './RiffDetail.js';

/* this component maps over all of the user's riffs for this video */
function RiffList(props) {
  console.log('display', props.riffs);
  return (
    <div className="list-of-riffs">
      {props.riffs
        ? props.riffs.sort( (e1,e2) => (e1.time - e2.time) ).map((riff, index) => (
            <RiffDetail
              key={riff.id}
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
  riffs: state.riffs.all,
  riffsPlaying: state.riffsPlaying
});

export default connect(mapStateToProps, null)(RiffList);
