import React from 'react';
import Record from './Record.js';
import Scribe from './Scribe.js';
import TestButton from './TestButton.js';
import RiffList from './RiffList.js';


function EditControls(props) {
  return (
    <div>
      <div>
        <Record />
        <Scribe />
        <TestButton />
      </div>
      <div>
        <RiffList />
      </div>
    </div>
  );
}

export default EditControls;
