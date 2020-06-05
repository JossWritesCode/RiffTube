import React from 'react';
import { connect } from 'react-redux';
import { setRifferName } from '../actions';
import NavBar from './NavBar.js';

function Profile({ name, googleUser }) {
  return (
    <div className="landing-page">
      <NavBar color="white" />
      <p>Hello ${name}</p>
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
