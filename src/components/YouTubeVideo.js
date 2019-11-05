import
{
    setPlayerMode,

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

    if (!window.YT)  // If not, load the script asynchronously
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
    
        if ( data == 1 ) // playing
        {
            if ( this.props.mode == PAUSE_MODE )
            {
                // change mode state
                this.props.setPlayerMode( PLAY_MODE );
            }
        }
        else // not playing
        {
            if ( this.props.mode == PLAY_MODE )
            {
                // cahnge mode state
                this.props.setPlayerMode( PAUSE_MODE );
            }
        }
  }

shouldComponentUpdate = nextProps =>
{
    // is this wrong to do? maybe, but this is an odd use case
    
    if ( this.props.mode != nextProps.mode )
    {
        if
        (
            (
                nextProps.mode == EDIT_MODE ||
                nextProps.mode == EDIT_NEW_MODE ||
                nextProps.mode == PAUSE_MODE
            ) &&
            this.player.getPlayerState() != 2
        )
        {
            this.player.pauseVideo();
        }
        else if ( nextProps.mode == PLAY_MODE && this.player.getPlayerState() == 1 )
        {
            this.player.pauseVideo();
        }
    }

    if ( this.props.id == nextProps.id )
        return false;

    return true;
}


  render = () => {
    const { id } = this.props;
    return (
      <div className={classes.container}>
        <div id={`youtube-player-${id}`} className={classes.video} />
      </div>
    );
  };
}

const mapStateToProps = state => ({
  id: state.videoID,
  mode: state.mode
});

const mapDispatchToProps =
  {
    setPlayerMode
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(YouTubeVideo);