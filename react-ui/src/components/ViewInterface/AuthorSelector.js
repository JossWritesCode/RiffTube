import React from 'react';
import { connect } from 'react-redux';
import YouTubeVideo from '../YouTubeVideo/YouTubeVideo';
import { setVideoID, getViewRiffs } from '../../actions';

class AuthorSelector extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
            {
                selected: {}
            };
    }

    renderNames()
    {
        var names = [];
        this.props.riffs.forEach( el =>
            {
                console.log( "name", el.name, names.includes( el.name ) )
                if ( ! names.includes( el.name ) )
                    names.push( el.name );
            });
        return names.map( el => (
            <div>
                { el }
            </div>
        ));
    }
    
    render()
    {
        return (
            <div>
                {
                    this.renderNames()
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    riffs: state.riffs  
  });
  
/*
  const mapDispatchToProps = {
    setVideoID,
    getViewRiffs
  };
  */

export default connect(mapStateToProps, null)(AuthorSelector);