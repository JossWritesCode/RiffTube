import React from 'react';

function RiffDetail(props) {
  return (
    <div className="riff-detail">
        <div>Riff info: {JSON.stringify(props)}</div>
    </div>
  );
}

export default RiffDetail;
