import React from 'react';
import { connect } from 'react-redux';
import YouTubeVideo from '../YouTubeVideo/YouTubeVideo';
import AuthorSelector from './AuthorSelector';
import { setVideoID, getViewRiffs } from '../../actions';
import NavBar from '../NavBar.js';

const queryString = require('query-string');

class ViewInterface extends React.Component {
    constructor(props) {
        super(props);
        // copy passed in riffs
        this.state = { riffs: [...this.props.riffs] };
      }

    componentDidMount = () =>
    {
        this.props.setVideoID( this.props.match.params.videoID );

        this.props.getViewRiffs( this.props.match.params.videoID );
    };

    componentDidUpdate() {
        console.log( "filter" );
    }    

    render = () =>
    {
        const parsed = queryString.parse(this.props.location.search);

        console.log( parsed );

        return (
            <React.Fragment>
                <NavBar color="grey" />
                <div style={ {marginTop: "4em"} }>
                    <h1>View {this.props.match.params.videoID}</h1>
                    <span>{ this.props.match.params.authorID }</span>
                    <YouTubeVideo id={this.props.match.params.videoID} riffs={this.state.riffs} />
                    <AuthorSelector riffers={ this.props.match.params.authorID } />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    riffs: state.riffs.all
  });
  
  const mapDispatchToProps = {
    setVideoID,
    getViewRiffs
  };

export default connect(mapStateToProps, mapDispatchToProps)(ViewInterface);