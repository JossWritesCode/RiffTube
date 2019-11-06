import React from 'react';
import { connect } from 'react-redux';
import Record from './Record.js';
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
                        <div>
                            <Record />
                            <button
                                onClick={
                                    this.props.saveRiff.bind( null,
                                        {
                                            payload: 42
                                        }
                                    )
                                }>Save</button>
                        </div> :
                        <div>
                            <textarea id="riff-edit-field"></textarea>
                            <button
                                onClick={ () =>
                                    {
                                        //debugger;
                                        this.props.saveRiff(
                                            {
                                                payload: document.querySelector( "#riff-edit-field" ).innerHTML
                                            }
                                        )
                                    }
                                }>Save</button>
                        </div>
                }

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