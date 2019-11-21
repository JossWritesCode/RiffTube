import React from 'react';
import { connect } from 'react-redux';
import { editRiff } from '../../actions/index.js';

/* this component is where a user can edit their riff */
function RiffDetail(props) {
  console.log(props, 'RiffDetail props');
  return (
    <div className="riff-detail">
      <div style={{ backgroundColor: props.selected ? '#A41320' : '#202020', border: '2px solid white', margin: '10px', width: '150px' }}>
        <ul className="riff-detail-list">
          <li>No. {props.id}</li>
          <li>start time: {props.start_time ? props.start_time.toFixed(2) : null}</li>
          <li>type: {props.type}</li>
          <li>duration: {props.duration ? props.duration.toFixed(2) : null}</li>
        </ul>
        <button onClick={() => props.editRiff(props.index)}>Edit</button>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  editRiff
};

export default connect(null, mapDispatchToProps)(RiffDetail);
