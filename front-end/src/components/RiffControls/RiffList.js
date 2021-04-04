import React from 'react';
import { connect } from 'react-redux';
import RiffDetail from './RiffDetail.js';

/* this component maps over all of the user's riffs for this video */
function RiffList(props) {
  console.log('display', props.riffs);

  var totalLength = 0;
  const riffs = props.riffs ? props.riffs.sort( (e1,e2) => (e1.time - e2.time) ) : [];

  const riffDetails = [];
  for ( const index in riffs )
  {
    const riff = riffs[index];
    const posStyles = {};
    if ( riff.time > totalLength )
    {
      posStyles.top = `${riff.time / 10}em`;
      totalLength = riff.time + Math.max(riff.duration, 45);
    }
    else
    {
      posStyles.top = `${totalLength / 10}em`;
      totalLength += Math.max(riff.duration, 45);
    }
    posStyles.height = `${Math.max(riff.duration / 10, 4.5)}em`;
    riffDetails[index] =
      <RiffDetail
        key={riff.id}
        style={posStyles}
        {...riff}
        index={index}
        selected={props.riffsPlaying[index] === true} // === unneeded
      />
  }

  return (
    <div className="list-of-riffs" style={{height: `${totalLength / 10}em`}}>
      {riffDetails}
    </div>
  );
}

const mapStateToProps = state => ({
  riffs: state.riffs.all,
  riffsPlaying: state.riffsPlaying
});

export default connect(mapStateToProps, null)(RiffList);
