import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Login from './Login/Login';
import { setRifferName, getUserData } from '../actions';
import NavBar from './NavBar.js';
import VideoList from './VideoList';

const Account = ({
  name,
  googleUser,
  setRifferName,
  userData,
  getUserData,
  userid,
}) => {
  const [userName, setUserName] = useState(name);

  useEffect(() => {
    if (googleUser) getUserData(googleUser);
  }, [getUserData, googleUser]);

  const loggedIn = () => {
    if (googleUser) return googleUser.isSignedIn();
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userName !== '') {
      setRifferName(userName, googleUser);
    }
  };
  const handleChange = (event) => {
    event.preventDefault();
    setUserName(event.target.value);
  };

  return (
    <div className="landing-page">
      <NavBar />
      <div className="title-and-url heading">
        <h1 className="heading-primary-main account-heading">
          Account Settings
        </h1>
      </div>
      <section className="top-part">
        {loggedIn() ? (
          <>
            <h3>
              visit <Link to={`/profile/${userid}`}>public profile</Link>
            </h3>
            <form onSubmit={(event) => handleSubmit(event)}>
              <label>
                <h2 className="account-section-title">My Riffer Name</h2>
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
            <h2 className="account-section-title">My Videos</h2>
            <VideoList userData={userData} />
          </>
        ) : (
          <>
            <Login /> <p>to get started</p>
          </>
        )}
      </section>
    </div>
  );
};

let mapStateToProps = (state) => ({
  name: state.name,
  googleUser: state.googleUser,
  userData: state.userData,
  userid: state.user_id,
});

const mapDispatchToProps = {
  setRifferName,
  getUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
