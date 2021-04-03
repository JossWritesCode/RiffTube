import React from 'react';
import { connect } from 'react-redux';
import { createTempRiff } from '../../actions/index.js';

class RiffButton extends React.Component {
  constructor(props) {
    super(props)
    window.addEventListener("keydown",
      e => {if (e.key == "r") props.createTempRiff(props.type, props.videoID);})
  }

  render() {
    return (
      <button
        className="riff-button"
        onClick={() => {
          this.props.createTempRiff(this.props.type, this.props.videoID);
        }}
      >
        {this.props.type}
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  videoID: state.videoID,
});

const mapDispatchToProps = {
  createTempRiff,
};

export default connect(mapStateToProps, mapDispatchToProps)(RiffButton);
