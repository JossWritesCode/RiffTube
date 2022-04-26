import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ color }) => (
  <nav className="navbar">
    <NavLink
      exact
      activeClassName="navbar-link-active"
      style={{ color }}
      to="/"
    >
      Home
    </NavLink>
    <NavLink activeClassName="navbar-link-active" style={{ color }} to="/riff">
      Riff<em>!</em>
    </NavLink>
    <NavLink
      activeClassName="navbar-link-active"
      style={{ color }}
      to="/TheList"
    >
      The List
    </NavLink>
    <NavLink activeClassName="navbar-link-active" style={{ color }} to="/about">
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

export default NavBar;
