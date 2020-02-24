import React from 'react';

function MetaBar() {
  return (
    <div>
      {props.riffsMeta
        ? props.riffsMeta
            .sort((e1, e2) => e1.time - e2.time)
            .map((riff, index) => (
                <div style={{  }}>
              <RiffDetail
                key={riff.id}
                {...riff}
                index={index}
                selected={props.riffsPlaying[index] === true}
              />
            ))
        : null}
    </div>
  );
}

export default MetaBar;
