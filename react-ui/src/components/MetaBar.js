import React from 'react';
import { connect } from 'react-redux';

function MetaBar(props) {
  return (
    <div className="container-riff-meta">
      {props.riffsMeta && props.duration
        ? props.riffsMeta
            .map((riff, index) => (
              <div className="riff-meta" style={{ "left": (riff.time / props.duration) * 100 + "%", 
                "width": (riff.duration / props.duration) * 100 + "%"}}></div>
            ))
                : null}
    </div>
  );
}



const mapStateToProps = state => ({
  duration: state.duration,
  riffsMeta: state.riffsMeta
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MetaBar);
