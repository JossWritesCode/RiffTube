import React from 'react';
import { connect } from 'react-redux';
import
{
    editRiff
}
from '../actions';

function RiffDetail(props) {
  return (
    <div className="riff-detail">
        <div>
            <button onClick={ () => props.editRiff( props.index ) }>
                Edit
            </button>
        </div>
        <div>Riff info: {JSON.stringify(props)}</div>
    </div>
  );
}

const mapDispatchToProps =
  {
    editRiff
  };

export default connect(
    null,
    mapDispatchToProps
  )(RiffDetail);  
