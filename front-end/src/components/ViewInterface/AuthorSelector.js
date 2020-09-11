import React from 'react';
import { connect } from 'react-redux';
import ViewFilter from './ViewFilter';

class AuthorSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { names: [], muted: {}, filteredRiffs: [], all: true };
  }

  setMute = (id, mute) => {
    this.setState((state, props) => {
      // new state
      const m = { ...state.muted, [id]: mute };

      // const temp = props.riffs.filter((el) => !m[el.user_id]);

      return {
        muted: m,
        filteredRiffs: props.riffs.filter((el) => !m[el.user_id]),
        all: false,
      };
    });
  };

  toggleMute = (id) =>
  {
    //this.setMute(id, !this.state.muted[id]);

    debugger;

    const m = { ...this.state.muted, [id]: !this.state.muted[id] };

    // not muted
    const nm2 = this.state.names.map((el) => el.id);
    const nm = nm2.filter((el) => !m[el]);
    const nmStr = '?solo=' + nm.join(',');

    this.props.history.push(`/view/${this.props.videoID}${nmStr}`);
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props);

    debugger;

    /*
    if (
      prevState.muted !== this.state.muted ||
      prevState.all !== this.state.all
    ) {
      if (this.state.all) {
        this.props.history.push(`/view/${this.props.videoID}`);
      } else {
        // new muted state
        const m = { ...this.state.muted };

        // not muted
        const nm2 = this.state.names.map((el) => el.id);
        const nm = nm2.filter((el) => !m[el]);
        const nmStr = '?solo=' + nm.join(',');

        this.props.history.push(`/view/${this.props.videoID}${nmStr}`);
      }
    }
    */

    const rifferList = this.props.riffers
      ? this.props.riffers.indexOf(',') >= 0
        ? this.props.riffers.split(',')
        : [this.props.riffers]
      : [];

    if ( prevProps.riffers != this.props.riffers )
    {
      const m = {};
      this.state.names.forEach( el => m[el.id] = !(rifferList.includes( el.id ) || this.props.riffers === undefined) );
      console.log( "riffchng", m );
      this.setState( {
        muted: m,
        all: this.props.riffers === undefined, 
        filteredRiffs: this.props.riffs.filter((el) => !m[el.user_id])
      });
    }

    if (
      prevProps.timestamp !== this.props.timestamp ||
      (prevProps.riffs.length === 0 && this.props.riffs.length > 0)
    ) {
      //( prevProps.riffs !== this.props.riffs )
      const includes = (arr, id) => arr.some((el) => el.id === id);

      var names = [...this.state.names];

      const m = { ...this.state.muted };

      this.props.riffs.forEach((riff) => {
        //console.log( "name", el.name, includes( names, el.user_id ) );
        if (!includes(names, riff.user_id)) {
          //this.setState( state => ({ names: [ ...this.state.names, { name: el.name, id: el.user_id } ] }))
          names.push({ name: riff.name, id: riff.user_id });

          if (this.props.riffers !== undefined) {
            m[riff.user_id] = !rifferList.some(
              (riffer) => riff.user_id === Number(riffer)
            );
            //this.setMute( riff.user_id, !rifferList.some( riffer => riff.user_id === Number(riffer) ) );
          }
        }
      });
      this.setState({
        names,
        muted: m,
        all: this.props.riffers === undefined,
        filteredRiffs:
          this.props.riffers === undefined
            ? this.props.riffs
            : this.props.riffs.filter((el) => !m[el.user_id]),
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <ViewFilter
          id={this.props.videoID}
          duration={this.props.duration}
          riffs={this.state.filteredRiffs}
        />
        <div
          onClick={() =>
            {
              if (!this.state.all)
                this.props.history.push(`/view/${this.props.videoID}`);
              else
              {
                const nm2 = this.state.names.map((el) => el.id);
                const nm = nm2.filter((el) => !this.state.muted[el]);
                const nmStr = nm.join(',');

                this.props.history.push(`/view/${this.props.videoID}?solo=${nmStr}`);
              }
            }}
          style={{
            backgroundColor: this.state.all ? 'blue' : 'gray',
          }}
        >
          All
        </div>
        {this.state.names.map((el) => (
          <div
            key={el.id}
            onClick={() => this.toggleMute(el.id)}
            style={{
              backgroundColor: this.state.muted[el.id] ? 'gray' : 'blue',
            }}
          >
            {el.name}
          </div>
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  timestamp: state.riffs.timestamp,
});

export default connect(mapStateToProps, null)(AuthorSelector);
