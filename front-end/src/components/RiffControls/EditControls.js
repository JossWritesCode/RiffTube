import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';

import RiffList from './RiffList.js';
import EditRiff from './EditRiff.js';
import RiffButton from './RiffButton.js';
import { setRifferName, googleUserLogout } from '../../actions'; // this and below are the same file
import { EDIT_MODE, EDIT_NEW_MODE } from '../../actions';

import { createTempRiff, togglePlayerMode } from '../../actions/index.js';

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

      if (e.key === 'r') props.createTempRiff('audio', props.videoID);
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
        <RiffButton type="audio" />
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
});

const mapDispatchToProps = {
  setRifferName,
  googleUserLogout,
  createTempRiff,
  togglePlayerMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditControls);
