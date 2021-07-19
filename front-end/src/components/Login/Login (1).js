import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login-component';
import { setGoogleToken } from '../../actions/index.js';

class Login extends React.Component {
  render() {
    /**
     * The Sign-In client object.
     */
    var auth2;

    /**
     * Initializes the Sign-In client.
     */
    var initClient = function() {
        let gapi = window.gapi;
        if ( !gapi ) { console.log( "no gapi" ); return; }
        console.log( "gapi" );

        gapi.load('auth2', function(){
            /**
             * Retrieve the singleton for the GoogleAuth library and set up the
             * client.
             */
            auth2 = gapi.auth2.init({
                client_id: "941154439836-s6iglcrdckcj6od74kssqsom58j96hd8.apps.googleusercontent.com"
            });

            // Attach the click handler to the sign-in button
            auth2.attachClickHandler('signin-button', {}, onSuccess, onFailure);
        });
    };

    /**
     * Handle successful sign-ins.
     */
    var onSuccess = function(user) {
        console.log('Signed in as ' + user.getBasicProfile().getName());
    };

    /**
     * Handle sign-in failures.
     */
    var onFailure = function(error) {
        console.log(error);
    };

    initClient();

    return (
      <GoogleLogin
        socialId="941154439836-s6iglcrdckcj6od74kssqsom58j96hd8.apps.googleusercontent.com"
        className="google-login"
        scope="profile email"
        fetchBasicProfile={false}
        responseHandler={(gus) => {
          this.props.setGoogleToken(gus, this.props.videoID);
          console.log( gus, "gus" );
        }}
        buttonText="Login With Google"
      />
    );
  }
}

const mapStateToProps = (state) => ({
  videoID: state.videoID,
});

const mapDispatchToProps = {
  setGoogleToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
