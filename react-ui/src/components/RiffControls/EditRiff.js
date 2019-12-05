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

  constructor(props)
  {
    super(props);
    this.durationField = React.createRef();
    this.htmlPayloadField = React.createRef();
    this.startTimeField = React.createRef();
  }

  render() {
    console.log('ed rif red');
    return (
      <div className="edit-riff">
        <div className="edit-riff-inner">
          {this.props.tempRiff.type === 'audio' ? (
            <React.Fragment>
              {this.props.mode === EDIT_MODE && !this.props.tempRiff.payload ? (
                <span>Loading...</span>
              ) : null}
              <Record saveTempAudio={this.props.saveTempAudio} />
              {this.props.tempRiff.payload ? (
                <button
                  onClick={() => {
                    var audio = document.createElement('audio');
                    audio.controls = false;
                    var audioURL = URL.createObjectURL(
                      this.props.tempRiff.payload
                    );
                    audio.src = audioURL;
                    audio.play();
                  }}
                >
                  Play
                </button>
              ) : null}
              <br />
              <div>
                Start:{' '}
                <input
                  id="riff-start-field"
                  defaultValue={this.props.tempRiff.time}
                  ref={this.startTimeField}
                />
              </div>
              <button
                disabled={!this.props.tempRiff.payload}
                onClick={() => {
                  this.props.saveRiff(
                    this.props.googleUser.getAuthResponse().id_token,
                    {
                      payload: this.props.tempRiff.payload,
                      time: this.startTimeField.current.value
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
              <textarea id="riff-edit-field" ref={this.htmlPayloadField}>
                {this.props.tempRiff.payload}
              </textarea>
              <div>
                Duration:{' '}
                <input
                  id="riff-duration-field"
                  defaultValue={this.props.tempRiff.duration || 2}
                  ref={this.durationField}
                />
              </div>
              <div>
                Start:{' '}
                <input
                  id="riff-start-field"
                  defaultValue={this.props.tempRiff.time}
                  ref={this.startTimeField}
                />
              </div>
              <button
                onClick={() => {
                  this.props.saveRiff(
                    this.props.googleUser.getAuthResponse().id_token,
                    {
                      payload: this.htmlPayloadField.current.value,
                      duration: Number(
                        this.videoIDRef.current.value
                      ),
                      time: this.startTimeField.current.value
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mode: state.mode,
  tempRiff: state.tempRiff,
  googleUser: state.googleUser
});

const mapDispatchToProps = {
  setPlayerMode,
  saveRiff,
  saveTempAudio,
  cancelEdit
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRiff);
