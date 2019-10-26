import React from 'react';
import Record from './Record.js';
import Scribe from './Scribe.js';
import RiffList from './RiffList.js';


function EditControls(props) {
  return (
    <div>
      <div>
        <Record />
        <Scribe />
      </div>
      <div>
        <RiffList />
      </div>
    </div>
  );
}

export default EditControls;
