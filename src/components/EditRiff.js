import React from 'react';
import { connect } from 'react-redux';
import Record from './Record.js';
import
{
    saveRiff,
    setPlayerMode,
    saveTempAudio,
    cancelEdit
}
from '../actions';

class EditRiff extends React.Component
{
    render() {
        return (
            <div style={ { border: "1px solid black", padding: "1em" } }>
                {
                    this.props.tempRiff.type == 'audio'
                    ?
                        <React.Fragment>
                            <br />
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
                            <br />
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
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <div>
                            HTML payload:
                            </div>
                            <textarea id="riff-edit-field">{this.props.tempRiff.payload}</textarea>
                            <div>
                                Duration: <input id="riff-duration-field" defaultValue={this.props.tempRiff.duration || 2} />
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
                        </React.Fragment>
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