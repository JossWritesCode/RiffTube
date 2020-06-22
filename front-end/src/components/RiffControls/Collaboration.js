import React from 'react';
import { connect } from 'react-redux';

class Collaboration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.setState({ open: !this.state.open })}>
          Collaboration Panel
        </button>

        {this.state.open ? <div>open!</div> : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  videoID: state.videoID,
  googleUser: state.googleUser,
  name: state.name,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Collaboration);
