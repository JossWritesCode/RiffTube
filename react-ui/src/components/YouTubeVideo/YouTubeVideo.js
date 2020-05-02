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
import AllowPlayback from './AllowPlayback.js';

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
    if ( !window.YT ) return; // can be called by componentDidUpdate before window.YT has loaded

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

  // TODO: account for muted riffs!!!!
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

      // the following code is
      // needed I think... for pausing during a riff.
      // so that (subsiquent) 'zombie' riffs can be killed,
      // I think.
      this.curRiff = this.props.riffsPlaying;

      /*******************************************************/
      // this timer is responsible for showing and hiding riffs
      this.riffInterval = setInterval(() => {
        //console.log( "interval", this.curRiff, this.props.riffsPlaying );

        let t = window.rifftubePlayer.getCurrentTime();

        // if the MetaBar component exists, update its playhead
        if (window.metaPlayHead) {
          window.metaPlayHead.current.style.left =
            (t / this.props.duration) * 100 + '%';
        }
        this.checkForRiffsToLoad(t);

        // first stop any zombie riffs
        this.props.riffs.forEach((riff, index) => {
          if (
            this.curRiff[index] &&
            (t < riff.time || t > riff.time + riff.duration)
          ) {
            if (this.curRiff[index].inUse) this.curRiff[index].inUse = false;

            // by setting this to false, text riffs will be hidden
            this.props.setRiffPlaying(index, false);
            this.curRiff[index] = null;

            if (riff.type === 'audio')
              // make sure all audio clips have stopped
              this.audLock--;
            if (!this.audLock) {
              window.rifftubePlayer.setVolume(this.vol ? this.vol : 100); // hopefully unnecessary volume failsafe
              delete this.vol;
            }
          }
        });

        // next start any that should be playing
        this.props.riffs.forEach((riff, index) => {
          // the riff will start playing within half a second, or will be skipped
          if (
            !this.curRiff[index] &&
            t > riff.time &&
            t < riff.time + 0.5
          ) {
            this.props.setRiffPlaying(index, true);
            this.curRiff[index] = true; // used for text only; overwritten for audio

            if (riff.type === 'audio') {
              if (!this.vol) {
                this.vol = window.rifftubePlayer.getVolume();
                window.rifftubePlayer.setVolume(this.vol * 0.5);
              }

              // keeps track of how many audio tracks need to end before volume should be restored
              if (!this.audLock) this.audLock = 1;
              else this.audLock++;

              if (!riff.payload) {
                console.log('empty payload error');
                return;
              } // DEBUG - SHOULD BE REMOVED
              var audioURL = URL.createObjectURL(riff.payload);
              //debugger;

              window.lastRiff = riff.payload;

              // FIX THIS:

              for (let i = 0; i < window.audioPlayersCount; i++) {
                /*
                if ( window.audioContexts[i].inUse ) continue;
                let audioContext = window.audioContexts[i];
                window.audioContexts[i].inUse = true;
                var blob = riff.payload;
                new Response(blob).arrayBuffer().then(function(arrayBuffer) {
                  window.audioContexts[0].decodeAudioData(arrayBuffer, audioData => {
                    debugger;
                    var source = window.audioContexts[i].createBufferSource();
                    source.buffer = audioData;
                    source.connect(window.audioContexts[i].destination);
                    source.start()
                  })
                });
                */

                let audio = window.audioPlayers[i];
                if (audio.inUse) continue;
                audio.inUse = true;

                // TEST:
                audio.srcEl.src = audioURL;
                audio.load();
                audio.play();

                /*
                var se = document.createElement('source');
                audio.appendChild(se);
                se.src = audioURL;
                //se.type = 'audio/webm';
                audio.load();
                audio.play();
                */

                // ORIG:
                /*
                audio.src = audioURL;
                audio.play();
                */

                console.log('play riff! at ', i);
                this.curRiff[index] = audio; // audioContext;
                break;
              }
            }
          }
        });
      }, 100); // 100/1000 = 1/10 s

      if (this.props.mode !== PLAY_MODE) {
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
      <React.Fragment>
        <div className="rifftube-container">
          <AllowPlayback />
          <div className="rifftube-overlay">
            <div className="rifftube-riffs-container">
              {Object.keys(this.props.riffsPlaying)
                .filter(
                  i =>
                    this.props.riffsPlaying[i] &&
                    this.props.riffs[i].type === 'text'
                )
                .map(key => (
                  <div
                    key={this.props.riffs[key].id}
                    className="rifftube-textriff"
                  >
                    {this.props.riffs[key].payload}
                  </div>
                ))}
            </div>
          </div>
          <div id="rifftube-player" />
        </div>
      </React.Fragment>
    );
  };
}

const mapStateToProps = state => ({
  mode: state.mode,
  //riffs: state.riffs.all,
  riffsPlaying: state.riffsPlaying,
  googleUser: state.googleUser,
  duration: state.duration
});

const mapDispatchToProps = {
  setPlayerMode,
  setRiffPlaying,
  togglePlayerMode,
  loadRiff
};

export default connect(mapStateToProps, mapDispatchToProps)(YouTubeVideo);
