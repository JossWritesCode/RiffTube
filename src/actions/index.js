import axios from 'axios';

export const GOOGLE_USER_SIGNIN = 'GOOGLE_USER_SIGNIN';
export const SEND_ACCESS_TOKEN = 'SEND_ACCESS_TOKEN';
export const SEND_ACCESS_TOKEN_SUCCESS = 'SEND_ACCESS_TOKEN_SUCCESS';
export const SEND_ACCESS_TOKEN_FAILURE = 'SEND_ACCESS_TOKEN_FAILURE';



export const setGoogleUser = googleUser => (
    {
        type: GOOGLE_USER_SIGNIN,
        payload: googleUser
    }
);
    


export const sendGoogleToken = token => {
    return dispatch => {
        dispatch({ type: SEND_ACCESS_TOKEN });
        axios
            .post(
                `http://localhost:3300/verify-token`,
                {
                    token
                }
            )
            .then(res => {
                // res.data.data
        
                dispatch({ type: SEND_ACCESS_TOKEN_SUCCESS, payload: res.data });
            })
            .catch(err => {
                dispatch({ type: SEND_ACCESS_TOKEN_FAILURE, payload: err.response });
            });
        };
    };