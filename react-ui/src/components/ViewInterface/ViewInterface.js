import React from 'react';
import { connect } from 'react-redux';
import YouTubeVideo from '../YouTubeVideo/YouTubeVideo';
import { setVideoID } from '../../actions';

class ViewInterface extends React.Component {
    componentDidMount = () =>
    {
        this.props.setVideoID( this.props.match.params.videoID );
    };

    render = () =>
    {
        return (
            <div>
                <h1>View {this.props.match.params.videoID}</h1>
                <YouTubeVideo id={this.props.match.params.videoID} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
  });
  
  const mapDispatchToProps = {
    setVideoID
  };

export default connect(mapStateToProps, mapDispatchToProps)(ViewInterface);