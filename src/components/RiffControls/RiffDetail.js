import React from 'react';
import { connect } from 'react-redux';
import { editRiff } from '../../actions/index.js';

/* this component is where a user can edit their riff */
function RiffDetail(props) {
  return (
    <div className="riff-detail">
      <div style={{ backgroundColor: props.selected ? 'lightpink' : 'white' }}>
        <button onClick={() => props.editRiff(props.index)}>Edit</button>
        <span>Riff info: {JSON.stringify(props)}</span>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  editRiff
};

export default connect(
  null,
  mapDispatchToProps
)(RiffDetail);
