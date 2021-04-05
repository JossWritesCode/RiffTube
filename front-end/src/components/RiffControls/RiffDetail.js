import React, { useState, useEffect, createRef } from 'react';
import { connect } from 'react-redux';
import { editRiff, deleteRiff, updateRiffTime } from '../../actions/index.js';
import Delete from '../../images/delete-24px.svg';
import Edit from '../../images/edit-24px.svg';
import Audio from '../../images/settings_voice-24px.svg';
import Text from '../../images/chat-24px.svg';

/* this component is where a user can edit their riff */
function RiffDetail(props) {

  const [visible, setVisible] = useState(false);

  //useEffect(() => { setTimeout(() => {setVisible(true);}, 20000); }, []);
  useEffect(() => { setVisible(true); }, []);

  const timeRef = createRef();

  console.log("rifffdetail", props);

  return (
    <div
      className={`riff-detail${props.selected ? ' riff-detail-selected' : ''}${visible ? '' : ' invisible'}`}
      style={props.style}
    >
      <button onClick={() => { window.rifftubePlayer.seekTo(Math.max(props.time - 3, 0), true); }}>jump to</button>
      {props.type === 'audio' ? (
        <div className="audio-icon riff-type-icon">
          <img alt="audio" src={Audio} />
        </div>
      ) : (
        <div className="text-icon riff-type-icon">
          <img alt="text" src={Text} />
        </div>
      )}
      {/* 
      <li>
        start time: {props.time ? props.time.toFixed(2) : null}
      </li>
      <li>duration: {props.duration.toFixed(2)}secs</li>
      <li>type: {props.type}</li>
      */}
      <input type="number" className="edit-time" step="0.5" defaultValue={props.time.toFixed(2)}
      ref={timeRef}
        onChange={() => {
          props.updateRiffTime(
            props.googleUser.getAuthResponse().id_token,
            timeRef.current.value,
            props.video_id,
            props.id,
            props.websocket ); }}></input>
      <div className="edit-riff-buttons">
        <button
          className="riff-button"
          onClick={() =>
            props.editRiff(
              props.index,
              props.type === 'audio'
                ? props.id
                : null, // weird but ok; yields id or null/false
              !props.riffsAudio.all[props.id],
            )
          }
        >
          <img alt="edit button" src={Edit} />
        </button>
        <button
          className="riff-button"
          onClick={() => {
            if (window.confirm('Delete?'))
              props.deleteRiff(
                props.id,
                props.googleUser,
                props.video_id,
                props.websocket
              );
          }}
        >
          <img alt="delete button" src={Delete} />
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  googleUser: state.googleUser,
  riffsAudio: state.riffsAudio,
  websocket: state.websocket,
});

const mapDispatchToProps = {
  editRiff,
  deleteRiff,
  updateRiffTime,
};

export default connect(mapStateToProps, mapDispatchToProps)(RiffDetail);
