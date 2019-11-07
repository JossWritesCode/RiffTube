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
            <span>Riff info: {JSON.stringify(props)}</span>
        </div>
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
