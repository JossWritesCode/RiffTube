import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

function NavBar({ color, googleUser }) {
  const loggedIn = () => {
    if (googleUser) return googleUser.isSignedIn();
    return false;
  };

  return (
    <nav className="navbar">
      <NavLink
        exact
        activeClassName="navbar-link-active"
        style={{ color }}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        activeClassName="navbar-link-active"
        style={{ color }}
        to="/riff"
      >
        Start Riffing
      </NavLink>
      {loggedIn() ? (
        <NavLink
          activeClassName="navbar-link-active"
          style={{ color }}
          to="/profile"
        >
          Profile
        </NavLink>
      ) : null}
      <NavLink
        activeClassName="navbar-link-active"
        style={{ color }}
        to="/about"
      >
        About
      </NavLink>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  googleUser: state.googleUser,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
