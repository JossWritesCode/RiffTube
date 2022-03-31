import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { setGoogleUser } from '../../actions/index.js';

const Login = ({ setGoogleUser, videoID }) => (
  <GoogleLogin
    clientId="941154439836-s6iglcrdckcj6od74kssqsom58j96hd8.apps.googleusercontent.com"
    className="google-login"
    isSignedIn
    onSuccess={(gus) => {
      setGoogleUser(gus, videoID);
    }}
    buttonText="Login With Google"
  />
);

const mapStateToProps = (state) => ({
  videoID: state.videoID,
});

const mapDispatchToProps = {
  setGoogleUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
