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
        {this.props.riffsMeta && this.props.duration && this.props.riffs
          ? this.props.riffsMeta
              .filter((el) => !this.props.riffs.find((t) => el.id === t.id))
              .map((riff) => (
                <div
                  className="riff-meta"
                  style={{
                    left: (riff.time / this.props.duration) * 100 + '%',
                    width: (riff.duration / this.props.duration) * 100 + '%',
                  }}
                />
              ))
          : null}
        {this.props.riffs
          ? this.props.riffs.map((riff) => (
              <div
                className="riff-own-meta"
                style={{
                  left: (riff.time / this.props.duration) * 100 + '%',
                  width: (riff.duration / this.props.duration) * 100 + '%',
                }}
              ></div>
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  duration: state.duration,
  riffsMeta: state.riffsMeta,
  riffs: state.riffs.all,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MetaBar);
