import React from 'react';
import { connect } from 'react-redux'
import RiffDetail from './RiffDetail.js';

function RiffList(props) {
  return (
    <div>
        {
            props.riffs ?
                props.riffs.map( (riff, index) => (
                    <RiffDetail {...riff} index={index} selected={ props.riffsPlaying[index] === true } />
                )) :
                    null
        }
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