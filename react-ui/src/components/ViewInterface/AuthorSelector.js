import React from 'react';
import { connect } from 'react-redux';
import { toggleViewUserIdMuted } from '../../actions';

class AuthorSelector extends React.Component
{
    renderNames()
    {
        var names = [];
        const containsReducer = id => (ac, cur) => cur.id === id ? ac || true : ac || false;
        const includes = ( arr, id ) => arr.reduce( containsReducer( id ), false );

        this.props.riffs.forEach( el =>
            {
                console.log( "name", el.name, includes( names, el.user_id ) );
                if ( ! includes( names, el.user_id ) )
                    names.push( { name: el.name, id: el.user_id } );
            });
        return names.map( el => (
            <div key={el.id} onClick={ () => this.props.toggleViewUserIdMuted( el.id ) } style={ { backgroundColor: this.props.mutedIDs[el.id] ? 'gray' : 'blue' } }>
                { el.name }
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
    riffs: state.riffs.all,
    mutedIDs: state.viewMutedUserIDs
  });
  
  const mapDispatchToProps = {
    toggleViewUserIdMuted
  };

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSelector);