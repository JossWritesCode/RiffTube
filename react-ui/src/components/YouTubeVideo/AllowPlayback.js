import React from 'react';
import { connect } from 'react-redux';
import {
  setPlayerMode,
  PLAY_MODE
} from '../../actions/index.js';

class AllowPlayback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allowed: false };
  }

  componentDidMount = () => {
    var test = new Audio();
    test.controls = false;
    test.src = '/dingdong.wav';
    test.play()
      .then( () => { console.log( "playback ok" ); this.setupAudioPlayers(); } )
      .catch( () => { console.log( "playback not allowed" ); } );
  };

  setupAudioPlayers = () =>
  {
    this.setState( { allowed: true } );
    window.audioPlayers = [];
    window.audioPlayerUse = [];
    window.audioPlayersCount = 5;
    for ( let i = 0; i < 5; i++ )
    {
      window.audioPlayers[i] = new Audio(); // should be identical behavior to: document.createElement('audio');
      window.audioPlayers[i].controls = false;
      window.audioPlayers[i].addEventListener( "ended", function () { this.inUse = false; console.log( "riff finished" ); } )
    }
  }

  render = () => {
    if ( ! this.state ) return null;

    return !this.state.allowed
      ?
        <div className="audio-capture" onClick={ () => { this.setupAudioPlayers(); this.props.setPlayerMode( PLAY_MODE ); } } />
      :
        null;
  };
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  setPlayerMode
};

export default connect(mapStateToProps, mapDispatchToProps)(AllowPlayback);
