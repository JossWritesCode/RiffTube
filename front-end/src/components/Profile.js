import React from 'react';
import { connect } from 'react-redux';
import Login from './Login/Login';
import { setRifferName } from '../actions';
import NavBar from './NavBar.js';

function Profile({ name, googleUser, setRifferName }) {
  const loggedIn = () => {
    if (googleUser) return googleUser.isSignedIn();
    return false;
  };

  return (
    <div className="landing-page">
      <NavBar />
      <section className="top-part">
        {
          loggedIn()
          ?
            <React.Fragment>
              <p>Hello {name}</p>
              <button
                type="button"
                onClick={() => {
                  var n = prompt('Enter name', name);
                  if (n) setRifferName(n, googleUser);
                }}
              >
                Update Name
              </button>
            </React.Fragment>
          :
            <React.Fragment>
              <Login /> <p>to get started</p>
            </React.Fragment>
        }
      </section>
    </div>
  );
}
let mapStateToProps = (state) => ({
  name: state.name,
  googleUser: state.googleUser,
});

const mapDispatchToProps = {
  setRifferName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
