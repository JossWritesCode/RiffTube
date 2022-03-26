import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

function NavBar({ color }) {
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
        Riff<em>!</em>
      </NavLink>
      <NavLink
        activeClassName="navbar-link-active"
        style={{ color }}
        to="/TheList"
      >
        The List
      </NavLink>
      <NavLink
        activeClassName="navbar-link-active"
        style={{ color }}
        to="/about"
      >
        About
      </NavLink>
      <NavLink
        activeClassName="navbar-link-active"
        style={{ color }}
        to="/account"
      >
        My Account
      </NavLink>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  googleUser: state.googleUser,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
