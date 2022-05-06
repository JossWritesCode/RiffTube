import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';

import RiffList from './RiffList.js';
import EditRiff from './EditRiff.js';
import RiffButton from './RiffButton.js';
import { setRifferName, googleUserLogout } from '../../actions'; // this and below are the same file
import { EDIT_MODE, EDIT_NEW_MODE } from '../../actions';

import { createTempRiff, togglePlayerMode, setRecorder } from '../../actions/index.js';

/*This component houses all of the riff buttons and the rifflist*/
function EditControls(props) {
  useEffect(() => {
    const blurEvent = () => {
      setTimeout(() => {
        document.activeElement.blur();
      }, 100);
    };
    window.addEventListener('blur', blurEvent);
    const keydownEvent = (e) => {
      console.log(props.mode);

      if (e.key === 'r') props.createTempRiff('audio', props.videoID, true);
      else if (e.key === 't') props.createTempRiff('text', props.videoID);
      else if (props.mode === EDIT_MODE || props.mode === EDIT_NEW_MODE) return;
      else if (e.key === 'j' || e.key === 'ArrowLeft' || e.key === 'Left')
        // I actually took MS specific BS into account
        window.rifftubePlayer.seekTo(
          Math.max(window.rifftubePlayer.getCurrentTime() - 5, 0),
          true
        );
      else if (e.key === 'l' || e.key === 'ArrowRight' || e.key === 'Right')
        window.rifftubePlayer.seekTo(
          Math.min(window.rifftubePlayer.getCurrentTime() + 5, props.duration),
          true
        );
      else if (e.key === ' ' || e.key === 'k') {
        props.togglePlayerMode();
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', keydownEvent);

    return () => {
      window.removeEventListener('blur', blurEvent);
      window.removeEventListener('keydown', keydownEvent);
    };
  }, [props]);

  return (
    <div className="control-panel">
      {
        // make this into a component?:
        props.name ? (
          <React.Fragment>
            <div className="riffer-name">
              Riffer Name:&nbsp;
              {props.name}
            </div>
            <GoogleLogout
              clientId="941154439836-s6iglcrdckcj6od74kssqsom58j96hd8.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={() => props.googleUserLogout()}
            ></GoogleLogout>
          </React.Fragment>
        ) : null
      }

      {/* to add back later <Collaboration /> */}

      <div>
        <h2 className="add-riff-title">Add New Riff</h2>
        {
          props.recorder !== null ?
            <RiffButton type="audio" />
          :
            <button onClick={() => {
              var AudioContext =
                window.AudioContext || window.webkitAudioContext; // Default // Safari and old versions of Chrome
              var audioContext = new AudioContext();
              if (navigator.mediaDevices) {
                navigator.mediaDevices
                  .getUserMedia({ audio: true, video: false })
                  .then((stream) => {
                    // gum (get user media)
                    var input = audioContext.createMediaStreamSource(stream);
                
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
                    props.setRecorder(recorder);
                  })
                  .catch(function (err) {
                    //enable the record button if getUSerMedia() fails
                    console.log("oops, can't get stream", err);
                  });
              }
            }}>
              Click to allow recording
            </button>
        }
        <RiffButton type="text" />

        {props.mode === EDIT_MODE || props.mode === EDIT_NEW_MODE ? (
          <EditRiff />
        ) : null}
      </div>
      <h2 className="riff-list-title">Control Panel</h2>
      <RiffList />
    </div>
  );
}

let mapStateToProps = (state) => ({
  mode: state.mode,
  name: state.name,
  googleUser: state.googleUser,
  videoID: state.videoID,
  duration: state.duration,
  recorder: state.recorder,
});

const mapDispatchToProps = {
  setRifferName,
  googleUserLogout,
  createTempRiff,
  togglePlayerMode,
  setRecorder,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditControls);
