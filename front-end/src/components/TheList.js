import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import Login from './Login/Login';
import { getGlobalVideoList } from '../actions';
import NavBar from './NavBar.js';
import VideoList from './VideoList';

function TheList({
  globalVideoList,
  getGlobalVideoList,
}) {
  useEffect(() => {
    getGlobalVideoList();
  }, []);

  return (
    <div className="landing-page">
      <NavBar />
      <div className="title-and-url heading">
        <h1 className="heading-primary-main account-heading">
          The List
        </h1>
      </div>
      <section className="top-part">
        <h2 className="account-section-title">every movie with at least one riff added to it</h2>
        <VideoList userData={globalVideoList} />
      </section>
    </div>
  );
}
let mapStateToProps = (state) => ({
  globalVideoList: state.globalVideoList,
});

const mapDispatchToProps = {
  getGlobalVideoList,
};

export default connect(mapStateToProps, mapDispatchToProps)(TheList);
