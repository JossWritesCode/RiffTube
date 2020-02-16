import React from 'react';
import { connect } from 'react-redux';
import { editRiff, deleteRiff } from '../../actions/index.js';

/* this component is where a user can edit their riff */
function RiffDetail(props) {
  return (
    <div
      className={`riff-detail${props.selected ? ' riff-detail-selected' : ''}`}
    >
      <div>
        <ul className="riff-detail-list">
          <li>
            start time: {props.time.toFixed ? props.time.toFixed(2) : null}
          </li>
          <li>duration: {props.duration.toFixed(2)} seconds</li>
          <li>type: {props.type}</li>
          <li>No. {props.id}</li>
        </ul>
        <button
          className="riff-button"
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
        <button
          className="riff-button-delete"
          onClick={() => props.deleteRiff(props.id, props.googleUser)}
        >
          X
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  googleUser: state.googleUser
});

const mapDispatchToProps = {
  editRiff,
  deleteRiff
};

export default connect(mapStateToProps, mapDispatchToProps)(RiffDetail);
