import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login-component';
import { setGoogleUser } from '../actions';

class Login extends React.Component
{
  render() {
    return (
      <div>
        <GoogleLogin
          socialId="941154439836-s6iglcrdckcj6od74kssqsom58j96hd8.apps.googleusercontent.com"
          className="google-login"
          scope="profile"
          fetchBasicProfile={false}
          responseHandler={this.props.googleResponse}
          buttonText="Login With Google"
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  googleResponse: guser => { dispatch( setGoogleUser( guser ) ); }
})

export default connect(
  null,
  mapDispatchToProps
)(Login);
