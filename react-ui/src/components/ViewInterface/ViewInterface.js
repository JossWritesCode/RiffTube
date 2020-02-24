import React from 'react';
import { connect } from 'react-redux';
import YouTubeVideo from '../YouTubeVideo/YouTubeVideo';
import AuthorSelector from './AuthorSelector';
import { setVideoID, getViewRiffs } from '../../actions';
import NavBar from '../NavBar.js';

class ViewInterface extends React.Component {
  componentDidMount = () => {
    this.props.setVideoID(this.props.match.params.videoID);

    this.props.getViewRiffs(this.props.match.params.videoID);
  };

  render = () => {
    return (
      <div>
        <NavBar color="grey" />
        <h1>View {this.props.match.params.videoID}</h1>
        {/*When to play riffs is all in this component below */}
        <YouTubeVideo id={this.props.match.params.videoID} />
        <AuthorSelector />
      </div>
    );
  };
}

/*const mapStateToProps = state => ({
  });*/

const mapDispatchToProps = {
  setVideoID,
  getViewRiffs
};

export default connect(null, mapDispatchToProps)(ViewInterface);
