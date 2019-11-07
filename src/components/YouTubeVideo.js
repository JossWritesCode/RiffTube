import React from 'react';
import { connect } from 'react-redux'
import
{
    setPlayerMode,
    setRiffPlaying,

    EDIT_MODE,
    EDIT_NEW_MODE,
    PLAY_MODE,
    PAUSE_MODE
}
from '../actions';

// based on https://stackoverflow.com/questions/54017100/how-to-integrate-youtube-iframe-api-in-reactjs-solution

class YouTubeVideo extends React.Component {

  componentDidMount = () => {
    // On mount, check to see if the API script is already loaded

    if (!window.YT || !window.YT.Player)  // If not, load the script asynchronously
    {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = this.loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    }
    else  // If script is already there, load the video directly
    {
      this.loadVideo();
    }
  };

  loadVideo = () => {
    const { id } = this.props;

    this.player = new window.YT.Player('rifftube-player',
        {
        videoId: id,
        events:
            {
                onReady: this.onPlayerReady,
                onStateChange: this.onPlayerStateChange
            },
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

        console.log( "state change", data );
        console.log( "cur mode", this.props.mode )

        if ( data == 1 ) // playing
        {
            this.curRiff = null;
            this.riffInterval = setInterval( () =>
            {
                let t = window.rifftubePlayer.getCurrentTime();

                /*
                if ( this.curRiff != null )
                    console.log( "fuck", t, this.props.riffs[ this.curRiff ].time + this.props.riffs[ this.curRiff ].duration * 1000 );

                if ( this.curRiff != null )
                    console.log( `cur riff #${this.curRiff} @ ${t - (this.props.riffs[ this.curRiff ].time + this.props.riffs[ this.curRiff ].duration)} / ${t} - ${this.props.riffs[ this.curRiff ].time + this.props.riffs[ this.curRiff ].duration}` );
                */

                if ( this.curRiff != null && (t < this.props.riffs[ this.curRiff ].time || t > this.props.riffs[ this.curRiff ].time + this.props.riffs[ this.curRiff ].duration) )
                {
                    console.log( "curRiff null" );
                    this.props.setRiffPlaying( this.curRiff, false );
                    this.curRiff = null;
                }
                
                if ( this.curRiff === null )
                {
                    //debugger;
                    for ( let i = 0; i < this.props.riffs.length; i++ )
                    {
                        //if ( ! this.props.riffs[ i ] )
                        //    debugger;

                        if ( t > this.props.riffs[ i ].time && t < this.props.riffs[ i ].time + 0.5 )
                        {
                            //debugger;
                            console.log( `riff #${i} @ ${t - this.props.riffs[ i ].time}, ${t} - ${this.props.riffs[ i ].time}` );
                            
                            this.curRiff = i;
                            this.props.setRiffPlaying( i, true );

                            //break;
                        }
                    }
                }
            },
            100 ); // 100/1000 = 1/10 s

            if ( this.props.mode == PAUSE_MODE )
            {
                // change mode state
                this.props.setPlayerMode( PLAY_MODE );

                console.log( "paused to play" );
            }
        }
        else // not playing
        {
            if ( this.props.mode == PLAY_MODE )
            {
                // cahnge mode state
                this.props.setPlayerMode( PAUSE_MODE );

                console.log( "play to paused" );
            }
        }
  }

componentDidUpdate = prevProps =>
{
    console.log( "compdidupdate", this.props, prevProps );
    
    if ( this.props.mode != prevProps.mode )
    {
        if
        (
            (
                this.props.mode == EDIT_MODE ||
                this.props.mode == EDIT_NEW_MODE ||
                this.props.mode == PAUSE_MODE
            ) &&
            this.player.getPlayerState() == 1
        )
        {
            console.log( "pauseVideo" );
            this.player.pauseVideo();
        }
        else if ( this.props.mode == PLAY_MODE && this.player.getPlayerState() != 1 )
        {
            console.log( "playVideo" );
            this.player.playVideo();
        }
    }
}

  render = () => {
    return (
      <div /*className={classes.container}*/>
        <div id='rifftube-player' /*className={classes.video}*/ />
      </div>
    );
  };
}

const mapStateToProps = state => ({
  id: state.videoID,
  mode: state.mode,
  riffs: state.riffs
});

const mapDispatchToProps =
  {
    setPlayerMode,
    setRiffPlaying
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(YouTubeVideo);