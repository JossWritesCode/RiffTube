import React from 'react';
import YouTubeVideo from '../YouTubeVideo/YouTubeVideo';

// TODO: remove
import { toggleViewUserIdMuted, setViewUserIdMuted } from '../../actions';

class AuthorSelector extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { names: [], muted: {}, filteredRiffs: [] };
  }

  setMute = ( id, mute ) =>
  {
    const m = { ...this.state.muted, [id]: mute  };
    this.setState({
      muted: m,
      filteredRiffs: this.props.riffs.filter( el => !m[ el.user_id ] )
    } );
  };

  toggleMute = ( id ) =>
  {
    this.setMute( id, !this.state.muted[id] );
  };

  componentDidUpdate( prevProps )
  {
    console.log( this.props );

    /*
    if ( prevState.muted !== this.state.muted )
    {
      this.setState( { filteredRiffs: this.props.riffs.filter( el => !this.state.muted[ el.user_id ] ) } );
    }
    */

    if ( prevProps.riffs !== this.props.riffs )
    {
      const includes = (arr, id) => arr.some( el => el.id == id );

      this.props.riffs.forEach(el => {
        //console.log( "name", el.name, includes( names, el.user_id ) );
        if (!includes(this.state.names, el.user_id))
        {
          this.setState( state => ({ names: [ ...state.names, { name: el.name, id: el.user_id } ] }))
          //this.state.names.push({ name: el.name, id: el.user_id });

          if ( this.props.riffers )
          {
            this.setMute( el.user_id, el.user_id !== Number(this.props.riffers) )
          }
        }
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <YouTubeVideo id={this.props.videoID} riffs={this.state.filteredRiffs} />
        {
          this.state.names.map(el => (
            <div
              key={el.id}
              onClick={() => this.toggleMute(el.id)}
              style={{
                backgroundColor: this.state.muted[el.id] ? 'gray' : 'blue'
              }}
            >
              {el.name}
            </div>
          ))
        }
     </React.Fragment>
    );
  }
}

export default AuthorSelector;
