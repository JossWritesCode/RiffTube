import React from 'react';

class Record extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recorder: null,
      gumStream: null,
      recordingState: false
    };
  }

  componentDidMount() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(stream => {
          //assign to gumStream for later use 
          //gumStream = stream;
          this.setState( { "gumStream": stream } );
          /* use the stream */
          var AudioContext = window.AudioContext          // Default
              || window.webkitAudioContext;  // Safari and old versions of Chrome
          var audioContext = new AudioContext();
          var input = audioContext.createMediaStreamSource(stream);
          //stop the input from playing back through the speakers 
          input.connect(audioContext.destination) //get the encoding 
          var encodingType = 'mp3';
          var recorder = new window.WebAudioRecorder(input, {
              workerDir: "lib/",
              encoding: encodingType,
              onEncoderLoading: (recorder, encoding) => {
                  // show "loading encoder..." display 
                  console.log("Loading " + encoding + " encoder...");
              },
              onEncoderLoaded: (recorder, encoding) => {
                  // hide "loading encoder..." display
                  console.log(encoding + " encoder loaded");
              }
          });
          this.setState( { recorder } );
          recorder.onComplete = (recorder, blob) => {
            console.log("Encoding complete");
            //createDownloadLink(blob, recorder.encoding);
            this.props.saveTempAudio(blob, this.duration);
          };
          recorder.setOptions({
              timeLimit: 120,
              encodeAfterRecord: true,
              mp3: {
                  bitRate: 160
              }
          });
        }).catch(function(err) { //enable the record button if getUSerMedia() fails 
          console.log( "oops, can't get stream", err );
        });
    }
  }

  render() {
    var ret; // var for the value to be returned

    if (navigator.mediaDevices && this.state.recorder) {
      if (!this.state.recordingState) {
        ret = (
          <button
            id="recordBtn"
            onClick={() => {
              this.setState({ recordingState: true });
              this.chunks = [];
              this.startTime = Date.now();
              //this.state.mediaRecorder.start();

              //start the recording process 
              console.log("Recording started");
              this.state.recorder.startRecording();
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
              this.state.recorder.finishRecording();
            }}
          >
            stop
          </button>
        );
      }
    } else if (navigator.mediaDevices && !this.state.recorder) {
      debugger;
      ret = <span>mediaRecorder failed to initialize</span>;
    } else ret = <span>navigator.mediaDevices not supported. sorry.</span>;

    return (
      <React.Fragment>
        {ret}
      </React.Fragment>
    );
  }
}

export default Record;
