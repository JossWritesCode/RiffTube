import React from 'react';
import { connect } from 'react-redux';
import {
  setPlayerMode,
  setRiffPlaying,
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

    console.log('state change', data);
    console.log('cur mode', this.props.mode);

    if (data === 1) {
      // playing
      // needed I think... for pausing during a riff
      this.curRiff = this.props.riffsPlaying;

      /*******************************************************/
      // this timer is responsible for showing and hiding riffs
      this.riffInterval = setInterval(() => {
        //console.log( "interval", this.curRiff, this.props.riffsPlaying );

        let t = window.rifftubePlayer.getCurrentTime();

        // first stop any zombie riffs
        this.props.riffs.forEach((riff, index) => {
          if (
            this.curRiff[index] &&
            (t < riff.time || t > riff.time + riff.duration)
          ) {
            this.props.setRiffPlaying(index, false);
            this.curRiff[index] = false;
            //document.querySelector( '#riff-content' ).innerHTML = '';

            if (riff.type == 'audio') window.rifftubePlayer.setVolume(this.vol);
          }
        });

        // next start any that should be playing
        this.props.riffs.forEach((riff, index) => {
          // the riff will start playing within half a second, or will be skipped
          if (!this.curRiff[index] && t > riff.time && t < riff.time + 0.5) {
            this.props.setRiffPlaying(index, true);
            this.curRiff[index] = true;

            if (riff.type == 'audio') {
              this.vol = window.rifftubePlayer.getVolume();
              window.rifftubePlayer.setVolume(this.vol * 0.5);

              let audio = document.createElement('audio');
              audio.controls = false;
              if ( ! riff.payload ) return; // DEBUG - SHOULD BE REMOVED
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

        console.log('paused to play');
      }
    } // not playing
    else {
      // stop riff-check interval when not playing
      clearInterval(this.riffInterval);

      if (this.props.mode === PLAY_MODE) {
        // cahnge mode state
        this.props.setPlayerMode(PAUSE_MODE);

        console.log('play to paused');
      }
    }
  };

  componentDidUpdate = prevProps => {
    //console.log( "youtube vid component upate" );

    if (this.props.id !== prevProps.id) this.loadVideo();

    if (this.props.mode !== prevProps.mode) {
      if (
        (this.props.mode === EDIT_MODE ||
          this.props.mode === EDIT_NEW_MODE ||
          this.props.mode === PAUSE_MODE) &&
        this.player.getPlayerState() === 1
      ) {
        console.log('pauseVideo');
        this.player.pauseVideo();
      } else if (
        this.props.mode === PLAY_MODE &&
        this.player.getPlayerState() !== 1
      ) {
        console.log('playVideo');
        this.player.playVideo();
      }
    }
  };

  render = () => {
    console.log('render vid', this.props.riffsPlaying);
    return (
      <div style={{ position: 'relative' }}>
        <div id="rifftube-player" />
        {Object.keys(this.props.riffsPlaying)
          .filter(i => this.props.riffsPlaying[i])
          .map(key => (
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '390px',
                lineHeight: '390px',
                top: 0,
                textAlign: 'center',
                pointerEvents: 'none'
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  width: '640px',
                  font: '36pt serif',
                  backgroundColor: 'rgba(255,255,255,33%'
                }}
              >
                {this.props.riffs[key].type === 'text'
                  ? this.props.riffs[key].payload
                  : null}
              </div>
            </div>
          ))}
      </div>
    );
  };
}

const mapStateToProps = state => ({
  id: state.videoID,
  mode: state.mode,
  riffs: state.riffs,
  riffsPlaying: state.riffsPlaying
});

const mapDispatchToProps = {
  setPlayerMode,
  setRiffPlaying,
  togglePlayerMode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YouTubeVideo);
