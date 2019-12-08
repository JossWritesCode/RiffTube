import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import YouTubeVideo from '../YouTubeVideo/YouTubeVideo';
import Login from '../Login/Login';
import EditControls from './EditControls';
import { setVideoID, setRifferName } from '../../actions';

class EditInterface extends React.Component
{
  constructor(props)
  {
    super(props);
    this.videoIDRef = React.createRef();
  }

  loggedIn = () =>
  {
    if (this.props.googleUser)
      return this.props.googleUser.isSignedIn();

    return false;
  };

  authCheck = (Component, DefaultComponent) =>
  {
    return this.loggedIn() ? <Component /> : <DefaultComponent />;
  };
  /* extracts the youtube id from a url. got help from: https://ctrlq.org/code/19797-regex-youtube-id */
  extractVideoID = url =>
  {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length === 11) {
      return match[7];
    } else {
      alert('Could not extract video ID.');
    }
  };

  render()
  {
    return (
      <React.Fragment>
        <div>
          <form
            onSubmit={e => {
              // this and the below code should be considolidated
              this.props.setVideoID(
                this.extractVideoID(this.videoIDRef.current.value),
                this.props.googleUser
              );
              e.preventDefault();
            }}
          >
            <label>YouTube URL/ID:&nbsp;&nbsp;</label>
            <input
              type="text"
              defaultValue={this.props.videoID}
              ref={this.videoIDRef}
            />
            <button
              type="button"
              onClick={e => {
                this.props.setVideoID(
                  this.extractVideoID(this.videoIDRef.current.value),
                  this.props.googleUser
                );
              }}
            >
              Change Video
            </button>
          </form>

          <YouTubeVideo id={this.props.videoID} />

          {
            this.props.name
            ?
              <div>
                Riffer Name:{' '}
                {
                  this.props.name
                }
                <button
                  type="button"
                  onClick={ () => {
                    var n = prompt();
                    if ( n )
                      this.props.setRifferName( n, this.props.googleUser );
                  } }
                >
                  Update Name
                </button>
              </div>
            :
              null
          }

          <div>
            <a href={"/view/" + this.props.videoID} target="_blank">View video</a>
          </div>
        </div>
        <Route
          exact
          path="/"
          render={this.authCheck.bind(this, EditControls, Login)}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  videoID: state.videoID,
  googleUser: state.googleUser,
  name: state.name
});

const mapDispatchToProps = {
  setVideoID,
  setRifferName
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInterface);
