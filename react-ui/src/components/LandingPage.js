import React from 'react';
function LandingPage() {
  return (
    <div className="landing-page">
      <section className="top-part">
        <nav>
          <a>Home</a>
          <a>Start Riffing</a>
        </nav>
        <div className="heading">
          <span className="heading-primary-main">RiffTube:</span>
          <span className="heading-primary-sub">
            Make Your Voice Heard On Any YouTube Video
          </span>
          <a className="myBtn" class="btn portfolio-btn">
            Get Started &#8594;
          </a>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
