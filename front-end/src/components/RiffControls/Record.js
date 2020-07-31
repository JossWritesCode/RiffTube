import React from 'react';

class Record extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recorder: null,
      gumStream: null,
      recordingState: false,
    };
  }

  componentDidMount() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((stream) => {
          // gum (get user media)
          this.setState({ gumStream: stream });
        })
        .catch(function (err) {
          //enable the record button if getUSerMedia() fails
          console.log("oops, can't get stream", err);
        });
    }
  }

  render() {
    var ret; // var for the value to be returned

    if (navigator.mediaDevices) {
      if (!this.state.recordingState) {
        ret = (
          <button
            id="recordBtn"
            onClick={() => {
              this.setState({ recordingState: true });
              this.startTime = Date.now();
              //this.state.mediaRecorder.start();

              var AudioContext =
                window.AudioContext || window.webkitAudioContext; // Default // Safari and old versions of Chrome
              var audioContext = new AudioContext();
              var input = audioContext.createMediaStreamSource(
                this.state.gumStream
              );

              var recorder = new window.WebAudioRecorder(input, {
                workerDir: '/lib/',
                encoding: 'mp3',
                onEncoderLoading: (recorder, encoding) => {
                  // show "loading encoder..." display
                  console.log('Loading ' + encoding + ' encoder...');
                },
                onEncoderLoaded: (recorder, encoding) => {
                  // hide "loading encoder..." display
                  console.log(encoding + ' encoder loaded');
                },
              });

              //this.setState( recorder );
              this.recorder = recorder;

              recorder.onComplete = (recorder, blob) => {
                //createDownloadLink(blob, recorder.encoding);
                this.props.saveTempAudio(blob, this.duration);
              };
              recorder.setOptions({
                timeLimit: 120,
                encodeAfterRecord: true,
                mp3: {
                  bitRate: 160,
                },
              });

              //start the recording process

              recorder.startRecording();
            }}
          >
            Record
          </button>
        );
      } else {
        ret = (
          <button
            id="stopBtn"
            onClick={() => {
              this.setState({ recordingState: false });
              this.duration = (Date.now() - this.startTime) / 1000;
              //this.state.mediaRecorder.stop();

              this.state.gumStream.getAudioTracks()[0].stop();
              this.recorder.finishRecording();

              // create new stream
              navigator.mediaDevices
                .getUserMedia({ audio: true, video: false })
                .then((stream) => {
                  this.setState({ gumStream: stream });
                })
                .catch(function (err) {
                  //enable the record button if getUSerMedia() fails
                  console.log("oops, can't get stream", err);
                });
            }}
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

export default Record;
