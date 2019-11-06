import
{
    GOOGLE_USER_SIGNIN,
    SAVE_RIFF,
    CREATE_TEMP_AUDIO_RIFF,
    CREATE_TEMP_TEXT_RIFF,
    SET_PLAYER_MODE,
    SAVE_TEMP_AUDIO,
    CANCEL_EDIT,
    EDIT_RIFF,

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
                        tempRiff: { type: 'audio', time: window.rifftubePlayer.getCurrentTime() },
                        mode: EDIT_NEW_MODE
                    }
                );
            case CREATE_TEMP_TEXT_RIFF:
                return (
                    {
                        ...state,
                        tempRiff: { type: 'text', time: window.rifftubePlayer.getCurrentTime() },
                        mode: EDIT_NEW_MODE
                    }
                );
            case EDIT_RIFF:
                return (
                    {
                        ...state,
                        tempRiff: { ...state.riffs[ action.payload ] }, // copy specified riff to tempRiff
                        editIndex: action.payload,
                        mode: EDIT_MODE
                    }
                );
            case SET_PLAYER_MODE:
                return (
                    {
                        ...state,
                        mode: action.payload
                    }
                );
            case SAVE_TEMP_AUDIO:
                return (
                    {
                        ...state,
                        tempAudio: action.payload
                    }
                );
            case CANCEL_EDIT:
                return (
                    {
                        ...state,
                        tempAudio: null,
                        tempRiff: null,
                        editIndex: null,
                        mode: PAUSE_MODE
                    }
                );
            case SAVE_RIFF:
                let riff = { ...state.tempRiff, ...action.payload };
                let riffs;
                if ( state.mode == EDIT_NEW_MODE )
                    riffs = [ ...state.riffs, riff ];
                else // EDIT_MODE
                {
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