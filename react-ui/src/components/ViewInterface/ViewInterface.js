import React from 'react';
import { connect } from 'react-redux';
import AuthorSelector from './AuthorSelector';
import { setVideoID, getViewRiffs } from '../../actions';
import NavBar from '../NavBar.js';

const queryString = require('query-string');

class ViewInterface extends React.Component {

    componentDidMount = () =>
    {
        this.props.setVideoID( this.props.match.params.videoID );

        this.props.getViewRiffs( this.props.match.params.videoID );
    };

    render = () =>
    {
        const parsed = queryString.parse(this.props.location.search);

        //console.log( parsed );

        return (
            <React.Fragment>
                <NavBar color="grey" />
                <div style={ {marginTop: "4em"} }>
                    <h1>View {this.props.match.params.videoID}</h1>
                    <AuthorSelector
                        duration={this.props.duration}
                        history={this.props.history}
                        videoID={this.props.match.params.videoID}
                        riffers={ parsed.solo }
                        riffs={this.props.riffs} />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    riffs: state.riffs.all,
    duration: state.duration
  });
  
  const mapDispatchToProps = {
    setVideoID,
    getViewRiffs
  };

export default connect(mapStateToProps, mapDispatchToProps)(ViewInterface);