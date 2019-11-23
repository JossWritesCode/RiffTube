import React from 'react';
import { connect } from 'react-redux';
import Record from './Record.js';
import {
  saveRiff,
  setPlayerMode,
  saveTempAudio,
  cancelEdit,
  EDIT_MODE
} from '../../actions/index.js';

class EditRiff extends React.Component {
  render() {
    console.log( "ed rif red" );
    return (
      <div style={{ border: '1px solid black', padding: '1em' }}>
        {this.props.tempRiff.type == 'audio' ? (
          <React.Fragment>
            {this.props.mode == EDIT_MODE && !this.props.tempRiff.payload ? (
              <span>Loading...</span>
            ) : null}
            <Record saveTempAudio={this.props.saveTempAudio} />
            {this.props.tempRiff.payload ? (
              <button
                onClick={() => {
                  var audio = document.createElement('audio');
                  audio.controls = false;
                  var audioURL = URL.createObjectURL(this.props.tempRiff.payload);
                  audio.src = audioURL;
                  audio.play();
                }}
              >
                Play
              </button>
            ) : null}
            <br />
            <button
              disabled={!this.props.tempRiff.payload}
              onClick={() => {
                this.props.saveRiff
                (
                  this.props.googleUser.getAuthResponse().id_token,
                  {
                    payload: this.props.tempRiff.payload
                  },
                  this.props.tempRiff
                );
              }}
            >
              Save
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>HTML payload:</div>
            <textarea id="riff-edit-field">
              {this.props.tempRiff.payload}
            </textarea>
            <div>
              Duration:{' '}
              <input
                id="riff-duration-field"
                defaultValue={this.props.tempRiff.duration || 2}
              />
            </div>
            <button
              onClick={() => {
                this.props.saveRiff
                (
                  this.props.googleUser.getAuthResponse().id_token,
                  {
                    payload: document.querySelector('#riff-edit-field').value,
                    duration: Number(
                      document.querySelector('#riff-duration-field').value
                    )
                  },
                  this.props.tempRiff
                );
              }}
            >
              Save
            </button>
          </React.Fragment>
        )}

        <button
          onClick={() => {
            this.props.cancelEdit();
          }}
        >
          Cancel
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mode: state.mode,
  tempRiff: state.tempRiff,
  riffs: state.riffs, // needed for prop of blah blah blah
  googleUser: state.googleUser
});

const mapDispatchToProps = {
  setPlayerMode,
  saveRiff,
  saveTempAudio,
  cancelEdit
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRiff);
