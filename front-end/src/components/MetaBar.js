import React, { createRef } from 'react';

const MetaBar = ({ riffsMeta, riffs, duration }) => {
  window.metaPlayHead = createRef();
  return (
    <div className="container-riff-meta">
      <div id="meta-play-head" ref={window.metaPlayHead} />
      {riffsMeta &&
        duration &&
        riffs &&
        riffsMeta
          .filter((el) => !riffs.find((t) => el.id === t.id))
          .map((riff) => (
            <div
              key={riff.id}
              className="riff-meta"
              style={{
                left: (riff.time / duration) * 100 + '%',
                width: (riff.duration / duration) * 100 + '%',
              }}
            />
          ))}
      {riffs &&
        riffs.map((riff) => (
          <div
            key={riff.id}
            className="riff-own-meta"
            style={{
              left: (riff.time / duration) * 100 + '%',
              width: (riff.duration / duration) * 100 + '%',
            }}
          ></div>
        ))}
    </div>
  );
};

export default MetaBar;
