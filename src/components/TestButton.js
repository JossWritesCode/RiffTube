import React from 'react';
import { connect } from 'react-redux';
import { sendGoogleToken } from '../actions';

class TestButton extends React.Component {
  render() {
    return (
      <button
        id="test-post-button"
        onClick={() => {
          this.props.sendGoogleToken(
            this.props.googleUser.getAuthResponse().id_token
          );
        }}
      >
        test verify token
      </button>
    );
  }
}

const mapStateToProps = state => ({
  googleUser: state.googleUser
});

const mapDispatchToProps = {
  sendGoogleToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestButton);
