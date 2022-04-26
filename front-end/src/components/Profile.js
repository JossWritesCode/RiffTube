import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPublicUserData } from '../actions';
import NavBar from './NavBar.js';
import VideoList from './VideoList';

const Profile = ({
  publicProfileData,
  publicProfileName,
  getPublicUserData,
  match: {
    params: { userID },
  },
}) => {
  useEffect(() => {
    getPublicUserData(userID);
  }, [getPublicUserData, userID]);

  return (
    <div className="landing-page">
      <NavBar />
      <div className="title-and-url heading">
        <h1 className="heading-primary-main account-heading">
          Profile for &quot;{publicProfileName}&quot;
        </h1>
      </div>
      <section className="top-part">
        <h2 className="account-section-title">Videos</h2>
        <VideoList userData={publicProfileData} />
      </section>
    </div>
  );
};

let mapStateToProps = (state) => ({
  publicProfileData: state.publicProfileData,
  publicProfileName: state.publicProfileName,
});

const mapDispatchToProps = {
  getPublicUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
