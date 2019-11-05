import axios from 'axios';

export const GOOGLE_USER_SIGNIN = 'GOOGLE_USER_SIGNIN';
export const SET_PLAYER_MODE = 'SET_PLAYER_MODE';
export const SEND_ACCESS_TOKEN = 'SEND_ACCESS_TOKEN';
export const SEND_ACCESS_TOKEN_SUCCESS = 'SEND_ACCESS_TOKEN_SUCCESS';
export const SEND_ACCESS_TOKEN_FAILURE = 'SEND_ACCESS_TOKEN_FAILURE';
export const CREATE_TEMP_AUDIO_RIFF = 'CREATE_TEMP_AUDIO_RIFF';
export const CREATE_TEMP_TEXT_RIFF = 'CREATE_TEMP_TEXT_RIFF';
export const CANCEL_TEMP_RIFF = 'CANCEL_TEMP_RIFF';
export const SAVE_TEMP_RIFF = 'SAVE_TEMP_RIFF';

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
