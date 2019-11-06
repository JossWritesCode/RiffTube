import
{
    GOOGLE_USER_SIGNIN,
    SAVE_RIFF,
    CREATE_TEMP_AUDIO_RIFF,
    CREATE_TEMP_TEXT_RIFF,
    CANCEL_TEMP_RIFF,
    SET_PLAYER_MODE,

    EDIT_MODE,
    EDIT_NEW_MODE,
    PLAY_MODE,
    PAUSE_MODE
}
from '../actions';

let initialState =
    {
        googleUser: null,
        riffs: [],
        tempRiff: null,
        mode: PAUSE_MODE,
        videoID: "PcT-xjnHCLA"
    };

export default (state = initialState, action) =>
    {
        switch (action.type)
        {
            case GOOGLE_USER_SIGNIN:
                return (
                    {
                        ...state,
                        googleUser: action.payload
                    }
                );
            case CREATE_TEMP_AUDIO_RIFF:
                return (
                    {
                        ...state,
                        tempRiff: { type: 'audio' },
                        mode: EDIT_NEW_MODE
                    }
                );
            case CREATE_TEMP_TEXT_RIFF:
                    return (
                        {
                            ...state,
                            tempRiff: { type: 'text' },
                            mode: EDIT_NEW_MODE
                        }
                    );
            case CANCEL_TEMP_RIFF:
                return (
                    {
                        ...state,
                        tempRiff: null,
                        mode: PAUSE_MODE
                    }
                );
            case SET_PLAYER_MODE:
                return (
                    {
                        ...state,
                        mode: action.payload
                    }
                );
            case SAVE_RIFF:
                let riff = { ...state.tempRiff, ...action.payload };
                let riffs;
                if ( state.mode == EDIT_NEW_MODE )
                    riffs = [ ...state.riffs, riff ];
                else
                { // not yet implemented
                    riffs = [ ...state.riffs ];
                    riffs[ state.editIndex ] = riff;
                }

                return (
                    {
                        ...state,
                        riffs,
                        tempRiff: null,
                        mode: PLAY_MODE // should be an option
                    }
                );
            default:
                console.log( "uncaught action!" );
                return state;
        }
    };