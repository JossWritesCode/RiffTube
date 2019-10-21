import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
 
class Login extends React.Component{
 
  constructor (props, context) {
    super(props, context);
  }
 
  responseGoogle (su_bound, googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();
    
    console.log({ googleId });
    console.log({accessToken: id_token});
    //anything else you want to do(save to localStorage)...

    debugger;

    su_bound( googleUser );
  }
 
  render () {
    return (
      <div>
        <GoogleLogin socialId="941154439836-s6iglcrdckcj6od74kssqsom58j96hd8.apps.googleusercontent.com"
                     className="google-login"
                     scope="profile"
                     fetchBasicProfile={false}
                     responseHandler={this.responseGoogle.bind(null, this.props.setUser)}
                     buttonText="Login With Google"/>
      </div>
    );
  }
 
}
 
export default Login;
