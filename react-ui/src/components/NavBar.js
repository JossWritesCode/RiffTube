import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar-landing">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/riff">Start Riffing</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  );
}

export default NavBar;