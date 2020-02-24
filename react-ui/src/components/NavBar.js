import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar({ color }) {
  return (
    <nav className="navbar">
      <NavLink style={{ color }} to="/">
        Home
      </NavLink>
      <NavLink style={{ color }} to="/riff">
        Start Riffing
      </NavLink>
      <NavLink style={{ color }} to="/about">
        About
      </NavLink>
    </nav>
  );
}

export default NavBar;
