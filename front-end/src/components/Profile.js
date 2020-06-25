import React, { useState } from 'react';
import { connect } from 'react-redux';
import Login from './Login/Login';
import { setRifferName } from '../actions';
import NavBar from './NavBar.js';

function Profile({ name, googleUser, setRifferName }) {
  const [userName, setUserName] = useState(name);
  const loggedIn = () => {
    if (googleUser) return googleUser.isSignedIn();
    return false;
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (userName !== '') {
      setRifferName(userName, googleUser);
    }
  }
  function handleChange(event) {
    event.preventDefault();
    setUserName(event.target.value);
  }

  return (
    <div className="landing-page">
      <NavBar />
      <div className="title-and-url heading">
        <h1>Profile Settings</h1>
      </div>
      <section className="top-part">
        {loggedIn() ? (
          <form onSubmit={(event) => handleSubmit(event)}>
            {/* <p>hello {name}</p> */}
            <label>
              UserName:
              <input
                onChange={(event) => handleChange(event)}
                type="text"
                name="name"
                defaultValue={name}
                className="form-field"
              />
            </label>
            <input type="submit" value="Submit" className="btn" />
          </form>
        ) : (
          <React.Fragment>
            <Login /> <p>to get started</p>
          </React.Fragment>
        )}
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
