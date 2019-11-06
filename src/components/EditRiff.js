import React from 'react';
import { connect } from 'react-redux';
import
{
    saveRiff,
    setPlayerMode,

    EDIT_MODE,
    EDIT_NEW_MODE,
    PLAY_MODE,
    PAUSE_MODE
}
from '../actions';

class EditRiff extends React.Component
{
    render() {
        return (
            <div>
                {
                    this.props.tempRiff.type == 'audio' ?
                        <span>audio</span> :
                        <span>visual</span>
                }

                <button
                    onClick={
                        this.props.saveRiff.bind( null,
                            {
                                test: 42
                            }
                        )
                    }>
                    Save
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        mode: state.mode,
        tempRiff: state.tempRiff
    }
);

const mapDispatchToProps =
  {
    setPlayerMode,
    saveRiff
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditRiff);  