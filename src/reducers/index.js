import
{
    GOOGLE_USER_SIGNIN,
    SAVE_TEMP_RIFF,
    CREATE_TEMP_AUDIO_RIFF,
    CREATE_TEMP_TEXT_RIFF,
    CANCEL_TEMP_RIFF,

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
        mode: PAUSE_MODE
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
            case SAVE_TEMP_RIFF:
                return (
                    {
                        ...state,
                        riffs: [ ...state.riffs, state.tempRiff ],
                        tempRiff: null,
                        mode: PAUSE_MODE
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
            default:
                return state;
        }
    };