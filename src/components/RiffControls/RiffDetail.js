import React from 'react';
import { connect } from 'react-redux';
import { editRiff } from '../../actions/index.js';

/* this component is where a user can edit their riff */
function RiffDetail(props) {
  console.log(props, 'RiffDetail props');
  return (
    <div className="riff-detail">
      <div>
        <ul className="riff-detail-list">
          <li>No. {props.id}</li>
          <li>
            start time: {props.start_time ? props.start_time.toFixed(2) : null}
          </li>
          <li>type: {props.type}</li>
          <li>duration: {props.duration ? props.duration.toFixed(2) : null}</li>
        </ul>
        <button
          onClick={() =>
            props.editRiff(
              props.index,
              props.type === 'audio' && !props.payload ? props.id : null,
              props.googleUser
            )
          }
        >
          Edit
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  googleUser: state.googleUser
});

const mapDispatchToProps = {
  editRiff
};

export default connect(mapStateToProps, mapDispatchToProps)(RiffDetail);
