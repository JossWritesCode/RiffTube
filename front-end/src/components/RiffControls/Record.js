import React from 'react';
import { connect } from 'react-redux';
import {
  setImmediateOff,
} from '../../actions/index.js';

class Record extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recordingState: false,
    };
  }

  // arrow classes bind the methods properly

  endRecord = () => {
    if (this.props.recorder == null) return; // do nothing if recording isn't yet allowed

    this.setState({ recordingState: false });
    this.duration = (Date.now() - this.startTime) / 1000;

    // experimenting this.state.gumStream.getAudioTracks()[0].stop();
    this.props.recorder.finishRecording();

    // create new stream -- NEEDED???? experimenting
    /*navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        this.setState({ gumStream: stream });
      })
      .catch(function (err) {
        //enable the record button if getUSerMedia() fails
        console.log("oops, can't get stream", err);
      });
      */
  }

  componentDidMount() {
    console.log("record CDM", this.props.userMedia);
    if ( this.props.immediateRecord )
    {
      console.log("start immediately");
      this.startRecord();
      setImmediateOff();
      window.addEventListener('keyup', (e) => { if (e.key == 'r') this.endRecord(); });
    }
  }


  startRecord = () => {
    if (this.props.recorder == null) return; // do nothing if recording isn't yet allowed

    this.setState({ recordingState: true });
    this.startTime = Date.now();
    //this.state.mediaRecorder.start();
    this.props.recorder.onComplete = (recorder, blob) => {
      //createDownloadLink(blob, recorder.encoding);
      this.props.saveTempAudio(blob, this.duration);
    };
    this.props.recorder.setOptions({
      timeLimit: 120,
      encodeAfterRecord: true,
      mp3: {
        bitRate: 160,
      },
    });

    //start the recording process
    setTimeout( () => this.props.recorder.startRecording(), 200 ); // delay start to avoid clicks and taps
  }

  render() {
    var ret; // var for the value to be returned

    if (navigator.mediaDevices) {
      if (!this.state.recordingState) {
        ret = (
          <button
            id="recordBtn"
            onClick={this.startRecord}
          >
            Record
          </button>
        );
      } else {
        ret = (
          <button
            id="stopBtn"
            onClick={this.endRecord}
          >
            stop
          </button>
        );
      }
    } else
      ret = (
        <span>
          Your device is not supported by navigator.mediaDevices. Sorry.
        </span>
      );

    return <React.Fragment>{ret}</React.Fragment>;
  }
}



const mapStateToProps = (state) => ({
  immediateRecord: state.immediateRecord,
  recorder: state.recorder,
});

const mapDispatchToProps = {
  setImmediateOff,
};

export default connect(mapStateToProps, mapDispatchToProps)(Record);
