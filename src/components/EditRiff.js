import React from 'react';
import { connect } from 'react-redux';
import Record from './Record.js';
import
{
    saveRiff,
    setPlayerMode,
    saveTempAudio,
    cancelEdit,

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
                    this.props.tempRiff.type == 'audio'
                    ?
                        <div>
                            <Record saveTempAudio={this.props.saveTempAudio} />
                            {
                                this.props.tempAudio
                                ?
                                    <button
                                        onClick={ () =>
                                            {
                                                var audio = document.createElement('audio');
                                                audio.controls = false;
                                                audio.src = this.props.tempAudio;
                                                audio.play();
                                            }
                                        }>Play</button>
                                :
                                    null
                            }
                            <button
                                disabled={ !this.props.tempAudio }
                                onClick={ () =>
                                    {
                                        this.props.saveRiff(
                                            {
                                                payload: this.props.tempAudio
                                            }
                                        );
                                    }
                                }>Save</button>
                        </div>
                    :
                        <div>
                            <textarea id="riff-edit-field">{this.props.tempRiff.payload}</textarea>
                            <div>
                                Duration: <input id="riff-duration-field" value={this.props.tempRiff.duration} />
                            </div>
                            <button
                                onClick={ () =>
                                    {
                                        this.props.saveRiff(
                                            {
                                                payload: document.querySelector( "#riff-edit-field" ).value,
                                                duration: document.querySelector( "#riff-duration-field" ).value
                                            }
                                        )
                                    }
                                }>Save</button>
                        </div>
                }

                <button
                    onClick={ () =>
                        {
                            this.props.cancelEdit();
                        }
                    }>Cancel</button>

            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        mode: state.mode,
        tempRiff: state.tempRiff,
        tempAudio: state.tempAudio
    }
);

const mapDispatchToProps =
  {
    setPlayerMode,
    saveRiff,
    saveTempAudio,
    cancelEdit
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditRiff);  