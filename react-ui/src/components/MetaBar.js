import React from 'react';
import { connect } from 'react-redux';

class MetaBar extends React.Component {
  constructor(props) {
    super(props);
    window.metaPlayHead = React.createRef();
  }
  render() {
    return (
      <div className="container-riff-meta">
        <div id="meta-play-head" ref={window.metaPlayHead} />
        {this.props.riffsMeta && this.props.duration
          ? this.props.riffsMeta.map((riff, index) => (
              <div
                className="riff-meta"
                style={{
                  left: (riff.time / this.props.duration) * 100 + '%',
                  width: (riff.duration / this.props.duration) * 100 + '%'
                }}
              ></div>
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  duration: state.duration,
  riffsMeta: state.riffsMeta
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MetaBar);
