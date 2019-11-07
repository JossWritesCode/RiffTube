import axios from 'axios';

export const GOOGLE_USER_SIGNIN = 'GOOGLE_USER_SIGNIN';

export const SEND_ACCESS_TOKEN = 'SEND_ACCESS_TOKEN';
export const SEND_ACCESS_TOKEN_SUCCESS = 'SEND_ACCESS_TOKEN_SUCCESS';
export const SEND_ACCESS_TOKEN_FAILURE = 'SEND_ACCESS_TOKEN_FAILURE';

export const CREATE_TEMP_AUDIO_RIFF = 'CREATE_TEMP_AUDIO_RIFF';
export const CREATE_TEMP_TEXT_RIFF = 'CREATE_TEMP_TEXT_RIFF';

export const EDIT_RIFF = 'EDIT_RIFF';

export const CANCEL_EDIT = 'CANCEL_EDIT';
export const SAVE_RIFF = 'SAVE_RIFF';

export const SAVE_TEMP_AUDIO = 'SAVE_TEMP_AUDIO';

export const SET_RIFF_PLAYING = 'SET_RIFF_PLAYING';
export const SET_RIFF_NOT_PLAYING = 'SET_RIFF_NOT_PLAYING';

export const SET_PLAYER_MODE = 'SET_PLAYER_MODE';
export const EDIT_MODE = 'EDIT_MODE';
export const EDIT_NEW_MODE = 'EDIT_NEW_MODE';
export const PLAY_MODE = 'PLAY_MODE';
export const PAUSE_MODE = 'PAUSE_MODE';

export const setGoogleUser = googleUser => (
    {
        type: GOOGLE_USER_SIGNIN,
        payload: googleUser
    }
);

export const setPlayerMode = mode => (
    {
        type: SET_PLAYER_MODE,
        payload: mode
    }
);

export const saveRiff = payload => (
    {
        type: SAVE_RIFF,
        payload
    }
);

export const saveTempAudio = payload => (
    {
        type: SAVE_TEMP_AUDIO,
        payload
    }
);

export const editRiff = payload => (
    {
        type: EDIT_RIFF,
        payload
    }
);

export const cancelEdit = () => (
    {
        type: CANCEL_EDIT
    }
);

export const sendGoogleToken = token => {
    return dispatch => {
        dispatch({ type: SEND_ACCESS_TOKEN });
        axios
            .post( `http://localhost:3300/verify-token`, { token } )
            .then(res => {
                // res.data.data
                dispatch({ type: SEND_ACCESS_TOKEN_SUCCESS, payload: res.data });
            })
            .catch(err => {
                dispatch({ type: SEND_ACCESS_TOKEN_FAILURE, payload: err.response });
            });
        };
    };

export const createTempRiff = type => ({
    type: type == 'audio' ? CREATE_TEMP_AUDIO_RIFF : CREATE_TEMP_TEXT_RIFF
});

export const setRiffPlaying = (index, playing) => ({
    type: playing ? SET_RIFF_PLAYING : SET_RIFF_NOT_PLAYING,
    payload: index
});
