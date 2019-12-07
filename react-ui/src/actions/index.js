import axios from 'axios';

export const GOOGLE_USER_SIGNIN = 'GOOGLE_USER_SIGNIN';

export const CREATE_TEMP_AUDIO_RIFF = 'CREATE_TEMP_AUDIO_RIFF';
export const CREATE_TEMP_TEXT_RIFF = 'CREATE_TEMP_TEXT_RIFF';

export const EDIT_RIFF = 'EDIT_RIFF';

export const CANCEL_EDIT = 'CANCEL_EDIT';
export const SAVE_RIFF = 'SAVE_RIFF';

export const SAVE_RIFF_SUCCESS = 'SAVE_RIFF_SUCCESS';
export const SAVE_RIFF_FAILURE = 'SAVE_RIFF_FAILURE';

export const SAVE_TEMP_AUDIO = 'SAVE_TEMP_AUDIO';

export const SET_RIFF_PLAYING = 'SET_RIFF_PLAYING';
export const SET_RIFF_NOT_PLAYING = 'SET_RIFF_NOT_PLAYING';

export const LOAD_RIFF = 'LOAD_RIFF';
export const RIFF_LOADED = 'RIFF_LOADED';

export const SET_PLAYER_MODE = 'SET_PLAYER_MODE';
export const EDIT_MODE = 'EDIT_MODE';
export const EDIT_NEW_MODE = 'EDIT_NEW_MODE';
export const PLAY_MODE = 'PLAY_MODE';
export const PAUSE_MODE = 'PAUSE_MODE';
export const TOGGLE_PLAYER_MODE = 'TOGGLE_PLAYER_MODE';

export const SET_VIDEO_ID = 'SET_VIDEO_ID';

export const RECEIVE_RIFF_LIST = 'RECEIVE_RIFF_LIST';

export const TOGGLE_VIEW_USERID_MUTED = 'TOGGLE_VIEW_USERID_MUTED';

export const toggleViewUserIdMuted = (uID) => ({
  type: TOGGLE_VIEW_USERID_MUTED,
  id: uID,
});

export const setVideoID = (videoID, googleUser) => {
  var baseURL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : '';
  return dispatch => {
    //console.log( "get url", `${baseURL}/get-riffs` );
    dispatch({
      type: SET_VIDEO_ID,
      payload: videoID
    });
    if ( googleUser && googleUser.getAuthResponse )
    {
      axios({
        method: 'post',
        url: `${baseURL}/get-riffs`,
        data: { token: googleUser.getAuthResponse().id_token, videoID }
      }).then(res => {
        dispatch({ type: RECEIVE_RIFF_LIST, payload: res.data });
      });
    }
  };
};

// perhaps this action should somehow call the above action (setVideoID)?
export const setGoogleUser = (googleUser, videoID) => {
  var baseURL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : '';
  return dispatch => {
    //console.log( "get url", `${baseURL}/get-riffs` );
    dispatch({
      type: GOOGLE_USER_SIGNIN,
      payload: googleUser
    });
    axios({
      method: 'post',
      url: `${baseURL}/get-riffs`,
      data: { token: googleUser.getAuthResponse().id_token, videoID }
    }).then(res => {
      dispatch({ type: RECEIVE_RIFF_LIST, payload: res.data });
    });
  };
};

export const getViewRiffs = (videoID) => {
  var baseURL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : '';
  return dispatch => {
    //console.log( "get url", `${baseURL}/get-riffs` );
    /*dispatch({
      type: null
    });*/
    axios({
      method: 'post',
      url: `${baseURL}/get-view-riffs`,
      data: { videoID }
    }).then(res => {
      dispatch({ type: RECEIVE_RIFF_LIST, payload: res.data });
    });
  };
};

export const setPlayerMode = mode => ({
  type: SET_PLAYER_MODE,
  payload: mode
});

export const togglePlayerMode = mode => ({
  type: TOGGLE_PLAYER_MODE
});

/*export const saveRiff = payload => ({
  type: SAVE_RIFF,
  payload
});*/

export const saveTempAudio = (payload, duration) => ({
  type: SAVE_TEMP_AUDIO,
  payload,
  duration
});

export const editRiff = (payload, id, gus) => {
  return dispatch => {
    dispatch({
      type: EDIT_RIFF,
      payload
    });

    if (id) rawLoadAxios(dispatch, id, gus);
  };
};

export const cancelEdit = () => ({
  type: CANCEL_EDIT
});

export const saveRiff = (token, payload, riff) => {
  var baseURL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : '';
  return dispatch => {
    dispatch({ type: SAVE_RIFF, payload });

    let fd = new FormData();
    fd.append('token', token);
    fd.append(riff.type === 'text' ? 'text' : 'blob', payload.payload);
    fd.append('type', riff.type);
    fd.append(
      'duration',
      riff.type === 'text' ? payload.duration : riff.duration
    );
    fd.append('start_time', payload.time);
    fd.append('video_id', riff.video_id);
    fd.append('tempId', riff.tempId);

    // this may be null, and that's ok
    fd.append('id', riff.id);

    axios({
      method: 'post',
      url: `${baseURL}/save-riff`,
      data: fd,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(res => {
        // res.data.data
        dispatch({ type: SAVE_RIFF_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: SAVE_RIFF_FAILURE, payload: err.response });
      });
  };
};

export const createTempRiff = type => ({
  type: type === 'audio' ? CREATE_TEMP_AUDIO_RIFF : CREATE_TEMP_TEXT_RIFF
});

export const setRiffPlaying = (index, playing) => ({
  type: playing ? SET_RIFF_PLAYING : SET_RIFF_NOT_PLAYING,
  payload: index
});

export const loadRiff = (id, guser) => {
  return dispatch => {
    rawLoadAxios(dispatch, id, guser);
  };
};

const rawLoadAxios = (dispatch, id, guser) => {
  var baseURL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : '';
  axios({
    method: 'post',
    url: `${baseURL}/load-riff`,
    responseType: 'arraybuffer',
    data: { token: guser ? guser.getAuthResponse().id_token : null, id } // modified to make guser optional
  }).then(res => {
    dispatch({ type: RIFF_LOADED, payload: res.data, id });
  });
};
