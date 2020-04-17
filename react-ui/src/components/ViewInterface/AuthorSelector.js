import React from 'react';
import { connect } from 'react-redux';
import { toggleViewUserIdMuted, setViewUserIdMuted } from '../../actions';

class AuthorSelector extends React.Component {

  state = { names: [] };

  componentDidUpdate( prevProps )
  {
    const includes = (arr, id) => arr.some( el => el.id == id );

    if ( prevProps.riffs !== this.props.riffs )
    {
      this.props.riffs.forEach(el => {
        //console.log( "name", el.name, includes( names, el.user_id ) );
        if (!includes(this.state.names, el.user_id))
        {
          this.setState( state => ({ names: [ ...state.names, { name: el.name, id: el.user_id } ] }))
          //this.state.names.push({ name: el.name, id: el.user_id });

          if ( this.props.riffers )
          {
            this.props.setViewUserIdMuted( el.user_id, el.user_id !== Number(this.props.riffers) )
          }
        }
      });
    }
  }

  renderNames() {
    // this is nice, but there has to be a better way:
    /*const containsReducer = id => (ac, cur) =>
      cur.id === id ? ac || true : ac || false;
    const includes = (arr, id) => arr.reduce(containsReducer(id), false);*/

    // there is:
    return this.state.names.map(el => (
      <div
        key={el.id}
        onClick={() => this.props.toggleViewUserIdMuted(el.id)}
        style={{
          backgroundColor: this.props.mutedIDs[el.id] ? 'gray' : 'blue'
        }}
      >
        {el.name}
      </div>
    ));
  }

  render() {
    return <div>{this.renderNames()}</div>;
  }
}

const mapStateToProps = state => ({
  riffs: state.riffs.all,
  mutedIDs: state.viewMutedUserIDs
});

const mapDispatchToProps = {
  toggleViewUserIdMuted,
  setViewUserIdMuted
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSelector);
