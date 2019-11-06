import React from 'react';
import { connect } from 'react-redux'
import RiffDetail from './RiffDetail.js';

function RiffList(props) {
  return (
    <div>
        {
            props.riffs ?
                props.riffs.map( (riff, index) => (
                    <RiffDetail {...riff} index={index} />
                )) :
                    null
        }
    </div>
  );
}

const mapStateToProps = state => ({
  riffs: state.riffs
});

export default connect(
  mapStateToProps,
  null
)(RiffList);