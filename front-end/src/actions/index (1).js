import axios from 'axios';

export const GOOGLE_USER_SIGNIN = 'GOOGLE_USER_SIGNIN';

export const CREATE_TEMP_AUDIO_RIFF = 'CREATE_TEMP_AUDIO_RIFF';
export const CREATE_TEMP_TEXT_RIFF = 'CREATE_TEMP_TEXT_RIFF';

export const EDIT_RIFF = 'EDIT_RIFF';

export const CANCEL_EDIT = 'CANCEL_EDIT';
export const SAVE_RIFF = 'SAVE_RIFF';

export const SAVE_RIFF_SUCCESS = 'SAVE_RIFF_SUCCESS';
export const SAVE_RIFF_FAILURE = 'SAVE_RIFF_FAILURE';

export const DELETE_RIFF = 'DELETE_RIFF';

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
export const RECEIVE_NAME_UPDATE = 'RECEIVE_NAME_UPDATE';

export const RECEIVE_RIFF_LIST = 'RECEIVE_RIFF_LIST';
export const RECEIVE_RIFF_META = 'RECEIVE_RIFF_META';

export const TOGGLE_VIEW_USERID_MUTED = 'TOGGLE_VIEW_USERID_MUTED';
export const SET_VIEW_USERID_MUTED = 'SET_VIEW_USERID_MUTED';

export const RECEIVE_COLLABORATION_ID = 'RECEIVE_COLLABORATION_ID';
export const CREATE_PLAYLIST_SUCCESS = 'START_COLLABORATION_SUCCESS';
export const CREATE_PLAYLIST_FAILURE = 'START_COLLABORATION_FAILURE';

export const SET_VIDEO_DURATION = 'SET_VIDEO_DURATION';

export const LOAD_PROFILE_DATA = 'LOAD_PROFILE_DATA';

export const WEB_SOCKET_UPDATE = 'WEB_SOCKET_UPDATE';

/******** WebSockets */

export const setWebSocket = (payload) => ({
  type: WEB_SOCKET_UPDATE,
  payload,
});

/******** Editing Interface */

export const setVideoDuration = (payload) => ({
  type: SET_VIDEO_DURATION,
  payload,
});

export const setRifferName = (newName, googleToken) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: `/set-name`,
      data: { token: googleToken, newName },
    }).then((res) => {
      dispatch({ type: RECEIVE_NAME_UPDATE, payload: res.data });
    });
  };
};

export const setVideoID = (videoID, googleToken) => {
  return (dispatch) => {
    dispatch({
      type: SET_VIDEO_ID,
      payload: videoID,
    });
    if (googleToken) {
      axios({
        method: 'post',
        url: `/get-riffs`,
        data: { token: googleToken, videoID },
      }).then((res) => {
        dispatch({ type: RECEIVE_RIFF_LIST, payload: res.data });
      });
      axios({
        method: 'post',
        url: `/get-view-riffs`,
        data: { videoID },
      }).then((res) => {
        dispatch({ type: RECEIVE_RIFF_META, payload: res.data });
      });
    }
  };
};

//Delete Riff
export const deleteRiff = (riffID, googleToken, video_id, websocket) => {
  return (dispatch) => {
    axios({
      method: 'delete',
      url: `/riff-remove/${riffID}`,
      data: {
        token: googleToken,
      },
    }).then((res) => {
      dispatch({ type: DELETE_RIFF, id: riffID });

      // websocket call
      websocket.send(JSON.stringify({ type: 'update', video_id }));
    });
  };
};

// perhaps this action should somehow call the above action (setVideoID)?
export const setGoogleToken = (googleToken, videoID) => {
  return (dispatch) => {
    dispatch({
      type: GOOGLE_USER_SIGNIN,
      payload: googleToken,
    });
    axios({
      method: 'post',
      url: `/get-riffs`,
      data: { token: googleToken, videoID },
    }).then((res) => {
      dispatch({ type: RECEIVE_RIFF_LIST, payload: res.data });
    });
    axios({
      method: 'post',
      url: `/get-view-riffs`,
      data: { videoID },
    }).then((res) => {
      dispatch({ type: RECEIVE_RIFF_META, payload: res.data });
    });
  };
};

export const getRiffsMeta = (videoID) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: `/get-view-riffs`,
      data: { videoID },
    }).then((res) => {
      dispatch({ type: RECEIVE_RIFF_META, payload: res.data });
    });
  };
};

export const getViewRiffs = (videoID) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: `/get-view-riffs`,
      data: { videoID },
    }).then((res) => {
      dispatch({ type: RECEIVE_RIFF_LIST, payload: res.data });
    });
  };
};

export const getProfileData = (googleToken) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: `/get-user-data`,
      data: { googleToken },
    }).then((res) => {
      dispatch({ type: LOAD_PROFILE_DATA, payload: res.data });
    });
  };
};

export const setPlayerMode = (mode) => ({
  type: SET_PLAYER_MODE,
  payload: mode,
});

export const togglePlayerMode = (mode) => ({
  type: TOGGLE_PLAYER_MODE,
});

/*export const saveRiff = payload => ({
  type: SAVE_RIFF,
  payload
});*/

export const saveTempAudio = (payload, duration) => ({
  type: SAVE_TEMP_AUDIO,
  payload,
  duration,
});

export const editRiff = (payload, id, gus) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_RIFF,
      payload, // index
      id,
    });

    // id is only passed when the audio riff needs loading
    if (id) rawLoadAxios(dispatch, id, gus); // loads riff audio
  };
};

export const cancelEdit = () => ({
  type: CANCEL_EDIT,
});

export const saveRiff = (token, payload, riff, websocket) => {
  return (dispatch) => {
    dispatch({ type: SAVE_RIFF, payload, riff });

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
      url: `/save-riff`,
      data: fd,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        // res.data.data
        dispatch({ type: SAVE_RIFF_SUCCESS, payload: res.data });
        // websocket call
        websocket.send(
          JSON.stringify({ type: 'update', video_id: riff.video_id })
        );
      })
      .catch((err) => {
        dispatch({ type: SAVE_RIFF_FAILURE, payload: err.response });
      });
  };
};

export const createTempRiff = (type, videoID) => ({
  type: type === 'audio' ? CREATE_TEMP_AUDIO_RIFF : CREATE_TEMP_TEXT_RIFF,
  videoID,
});

export const setRiffPlaying = (index, playing) => ({
  type: playing ? SET_RIFF_PLAYING : SET_RIFF_NOT_PLAYING,
  payload: index,
});

export const loadRiff = (id, guser) => {
  return (dispatch) => {
    rawLoadAxios(dispatch, id, guser);
  };
};

const rawLoadAxios = (dispatch, id, guser) => {
  axios({
    method: 'post',
    url: `/load-riff`,
    responseType: 'arraybuffer',
    data: { token: guser ? guser : null, id }, // modified to make guser optional
  }).then((res) => {
    dispatch({ type: RIFF_LOADED, payload: res.data, id });
  });
};
