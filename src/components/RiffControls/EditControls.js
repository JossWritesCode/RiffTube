import React from 'react';
import { connect } from 'react-redux';
import Record from './Record.js';

import RiffList from './RiffList.js';
import EditRiff from './EditRiff.js';
import RiffButton from './RiffButton.js';
import {
  EDIT_MODE,
  EDIT_NEW_MODE,
  PLAY_MODE,
  PAUSE_MODE
} from '../../actions/index.js';

/*This component houses all of the riff buttons and the rifflist*/
function EditControls(props) {
  return (
    <div className="control-panel">
      <div>
        <h2 className="add-riff-title">Add New Riff</h2>
        <RiffButton type="audio" />
        <RiffButton type="text" />
  

        {props.mode == EDIT_MODE || props.mode == EDIT_NEW_MODE ? (
          <EditRiff />
        ) : null}
      </div>

        <RiffList />

    </div>
  );
}

let mapStateToProps = state => ({
  mode: state.mode
});

export default connect(
  mapStateToProps,
  null
)(EditControls);
