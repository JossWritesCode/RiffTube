import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login-component';
import { setGoogleUser } from '../../actions/index.js';

class Login extends React.Component {
  render() {
    return (
      <div style={ { position: 'absolute', top: '1em', right: '1em' } }>
        <GoogleLogin
          socialId="941154439836-s6iglcrdckcj6od74kssqsom58j96hd8.apps.googleusercontent.com"
          className="google-login"
          scope="profile email"
          fetchBasicProfile={false}
          responseHandler={ gus => { this.props.setGoogleUser( gus, this.props.videoID ) } }
          buttonText="Login With Google"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  videoID: state.videoID
});

const mapDispatchToProps = {
  setGoogleUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
