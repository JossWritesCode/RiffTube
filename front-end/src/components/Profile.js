import React from 'react';
import { connect } from 'react-redux';
import { setRifferName } from '../actions';
import NavBar from './NavBar.js';

function Profile({ name, googleUser, setRifferName }) {
  return (
    <div className="landing-page">
      <NavBar />
      <section className="top-part">
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
