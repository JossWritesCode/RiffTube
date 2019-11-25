import React from 'react';
import { connect } from 'react-redux';
import { createTempRiff } from '../../actions/index.js';

class RiffButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.createTempRiff.bind(null, this.props.type)}>
        {this.props.type}
      </button>
    );
  }
}

const mapDispatchToProps = {
  createTempRiff
};

export default connect(null, mapDispatchToProps)(RiffButton);
