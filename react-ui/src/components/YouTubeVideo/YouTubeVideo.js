import React from 'react';
import { connect } from 'react-redux';
import {
  setPlayerMode,
  setRiffPlaying,
  loadRiff,
  togglePlayerMode,
  EDIT_MODE,
  EDIT_NEW_MODE,
  PLAY_MODE,
  PAUSE_MODE
} from '../../actions/index.js';

// based on https://stackoverflow.com/questions/54017100/how-to-integrate-youtube-iframe-api-in-reactjs-solution

class YouTubeVideo extends React.Component {
  componentDidMount = () => {
    // On mount, check to see if the API script is already loaded

    if (!window.YT || !window.YT.Player) {
      // If not, load the script asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = this.loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } // If script is already there, load the video directly
    else {
      this.loadVideo();
    }
  };

  loadVideo = () => {
    const { id } = this.props;

    if (window.rifftubePlayer) window.rifftubePlayer.destroy();

    this.player = new window.YT.Player('rifftube-player', {
      videoId: id,
      height: 390,
      width: 640,
      playerVars: {
        playsinline: 1 // allows it to play inline on iOS
      },
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange
      }
    });

    window.rifftubePlayer = this.player; // store global reference (used to get current playback time when needed)
  };

  onPlayerReady = event => {
    //event.target.playVideo();
  };

  checkForRiffsToLoad = t => {
    this.props.riffs.forEach(riff => {
      if (
        riff.type === 'audio' &&
        !riff.payload &&
        !riff.loading &&
        riff.time >= t &&
        riff.time < t + 10
      )
        this.props.loadRiff(riff.id, this.props.googleUser);
    });
  };

  onPlayerStateChange = ({ data }) => {
    /*
        -1 (unstarted)
        0 (ended)
        1 (playing)
        2 (paused)
        3 (buffering)
        5 (video cued).
        */

    // the following conditional leaves out some 'else's that should never occur

    if (data === 1) {
      // playing
      // needed I think... for pausing during a riff
      this.curRiff = this.props.riffsPlaying;

      /*******************************************************/
      // this timer is responsible for showing and hiding riffs
      this.riffInterval = setInterval(() => {
        //console.log( "interval", this.curRiff, this.props.riffsPlaying );

        let t = window.rifftubePlayer.getCurrentTime();

        this.checkForRiffsToLoad(t);

        // first stop any zombie riffs
        this.props.riffs.forEach((riff, index) => {
          if (
            this.curRiff[index] &&
            (t < riff.time || t > riff.time + riff.duration)
          ) {
            this.props.setRiffPlaying(index, false);
            this.curRiff[index] = false;
            //document.querySelector( '#riff-content' ).innerHTML = '';

            if (riff.type === 'audio')
              // make sure all audio clips have stopped
              this.audLock--;
              if ( !this.audLock )
              {
                window.rifftubePlayer.setVolume(this.vol ? this.vol : 100); // hopefully unnecessary volume failsafe
                delete this.vol;
              }
          }
        });

        var riffMuted = ind => this.props.mutedIDs[ this.props.riffs[ind].user_id ];

        // next start any that should be playing
        this.props.riffs.forEach((riff, index) => {
          // the riff will start playing within half a second, or will be skipped
          if ( !riffMuted(index) && !this.curRiff[index] && t > riff.time && t < riff.time + 0.5 ) {
            
            this.props.setRiffPlaying(index, true);
            this.curRiff[index] = true;

            if (riff.type === 'audio') {
              if ( !this.vol )
              {
                this.vol = window.rifftubePlayer.getVolume();
                window.rifftubePlayer.setVolume(this.vol * 0.5);
              }

              // keeps track of how many audio tracks need to end before volume should be restored
              if ( !this.audLock )
                this.audLock = 1;
              else
                this.audLock++;

              let audio = document.createElement('audio');
              audio.controls = false;
              if (!riff.payload) return; // DEBUG - SHOULD BE REMOVED
              var audioURL = URL.createObjectURL(riff.payload);
              audio.src = audioURL;
              audio.play();
            }
          }
        });
      }, 100); // 100/1000 = 1/10 s

      if (this.props.mode === PAUSE_MODE) {
        // change mode state
        this.props.setPlayerMode(PLAY_MODE);
      }
    } // not playing
    else {
      // stop riff-check interval when not playing
      clearInterval(this.riffInterval);

      if (this.props.mode === PLAY_MODE) {
        // change mode state
        this.props.setPlayerMode(PAUSE_MODE);
      }
    }
  };

  componentDidUpdate = prevProps => {
    //console.log( "youtube vid component upate" );

    this.checkForRiffsToLoad(0); // check if any riffs at < 10s in need loading

    if (this.props.id !== prevProps.id) this.loadVideo();

    if (this.props.mode !== prevProps.mode) {
      if (
        (this.props.mode === EDIT_MODE ||
          this.props.mode === EDIT_NEW_MODE ||
          this.props.mode === PAUSE_MODE) &&
        this.player.getPlayerState() === 1
      ) {
        this.player.pauseVideo();
      } else if (
        this.props.mode === PLAY_MODE &&
        this.player.getPlayerState() !== 1
      ) {
        this.player.playVideo();
      }
    }
  };

  render = () => {
    return (
      <div className="rifftube-container">
        <div id="rifftube-player" />
        {Object.keys(this.props.riffsPlaying)
          .filter(i => this.props.riffsPlaying[i] && this.props.riffs[i].type === 'text')
          .map(key => (
            <div key={this.props.riffs[key].id}>
              <div>
                {this.props.riffs[key].payload}
              </div>
            </div>
          ))}
      </div>
    );
  };
}

const mapStateToProps = state => ({
  mode: state.mode,
  riffs: state.riffs,
  riffsPlaying: state.riffsPlaying,
  googleUser: state.googleUser,
  mutedIDs: state.viewMutedUserIDs
});

const mapDispatchToProps = {
  setPlayerMode,
  setRiffPlaying,
  togglePlayerMode,
  loadRiff
};

export default connect(mapStateToProps, mapDispatchToProps)(YouTubeVideo);
