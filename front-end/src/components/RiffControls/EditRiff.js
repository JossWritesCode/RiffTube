import React from 'react';
import { connect } from 'react-redux';
import Record from './Record.js';
import {
  saveRiff,
  setPlayerMode,
  saveTempAudio,
  cancelEdit,
  EDIT_MODE,
} from '../../actions/index.js';

class EditRiff extends React.Component {
  constructor(props) {
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
              {this.props.mode === EDIT_MODE &&
              this.props.editIndex &&
              !this.props.tempAudio ? (
                <span>Loading...</span>
              ) : null}
              <Record saveTempAudio={this.props.saveTempAudio} />
              {this.props.tempAudio ? (
                <button
                  onClick={async () => {
                    debugger;
                
                    // https://stackoverflow.com/questions/43620594/audio-blob-not-working-in-ios-safari
                    // answer by scottmizo
                
                    /*
                    var blob = this.props.tempAudio;
                    var audioContext = new (window.webkitAudioContext || window.AudioContext)();
                    var arrayBuffer = await (new Response(blob)).arrayBuffer();
                    audioContext.decodeAudioData(arrayBuffer, audioData => {
                      var source = audioContext.createBufferSource();
                      source.buffer = audioData;
                      source.connect(audioContext.destination);
                      source.start()
                    });
                    */
                
                    var audio = document.createElement('audio');
                    var source = document.createElement('source');
                    audio.appendChild(source);
                
                    audio.controls = false;
                    var audioURL = URL.createObjectURL(this.props.tempAudio);
                
                    source.src = audioURL;
                    audio.load();
                
                    //audio.src = audioURL;
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
                disabled={!this.props.tempAudio}
                onClick={() => {
                  this.props.saveRiff(
                    this.props.googleUser.getAuthResponse().id_token,
                    {
                      payload: this.props.tempAudio,
                      time: Number(this.startTimeField.current.value),
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
              <textarea
                id="riff-edit-field"
                ref={this.htmlPayloadField}
                defaultValue={this.props.tempRiff.payload}
              />

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
                      duration: Number(this.durationField.current.value),
                      time: Number(this.startTimeField.current.value),
                    },
                    this.props.tempRiff,
                    this.props.websocket
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

const mapStateToProps = (state) => ({
  mode: state.mode,
  tempRiff: state.riffs.temp,
  tempAudio: state.riffsAudio.temp,
  editIndex: state.riffs.editIndex,
  googleUser: state.googleUser,
  websocket: state.websocket,
});

const mapDispatchToProps = {
  setPlayerMode,
  saveRiff,
  saveTempAudio,
  cancelEdit,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRiff);
