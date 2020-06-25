import React from 'react';
import { connect } from 'react-redux';

import RiffList from './RiffList.js';
import EditRiff from './EditRiff.js';
import RiffButton from './RiffButton.js';
import { setRifferName } from '../../actions'; // this and below are the same file
import { EDIT_MODE, EDIT_NEW_MODE } from '../../actions/index.js';

/*This component houses all of the riff buttons and the rifflist*/
function EditControls(props) {
  return (
    <div className="control-panel">
      {
        // make this into a component?:
        props.name ? (
          <div>
            Riffer Name:&nbsp;
            {props.name}
          </div>
        ) : null
      }

      {/* to add back later <Collaboration /> */}

      <div>
        <h2 className="add-riff-title">Add New Riff</h2>
        <RiffButton type="audio" />
        <RiffButton type="text" />

        {props.mode === EDIT_MODE || props.mode === EDIT_NEW_MODE ? (
          <EditRiff />
        ) : null}
      </div>
      <h2 className="riff-list-title">Control Panel</h2>
      <RiffList />
    </div>
  );
}

let mapStateToProps = (state) => ({
  mode: state.mode,
  name: state.name,
  googleUser: state.googleUser,
});

const mapDispatchToProps = {
  setRifferName,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditControls);
