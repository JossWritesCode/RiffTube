import axios from 'axios';

export const GOOGLE_USER_SIGNIN = 'GOOGLE_USER_SIGNIN';

export const CREATE_TEMP_AUDIO_RIFF = 'CREATE_TEMP_AUDIO_RIFF';
export const CREATE_TEMP_TEXT_RIFF = 'CREATE_TEMP_TEXT_RIFF';

export const EDIT_RIFF = 'EDIT_RIFF';

export const CANCEL_EDIT = 'CANCEL_EDIT';
export const SAVE_RIFF = 'SAVE_RIFF';

export const SAVE_RIFF_SUCCESS = 'SAVE_RIFF_SUCCESS';
export const SAVE_RIFF_FAILURE = 'SAVE_RIFF_FAILURE';

export const UPDATE_RIFF_TIME_SUCCESS = 'UPDATE_RIFF_TIME_SUCCESS';

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

export const LOAD_USER_DATA = 'LOAD_USER_DATA';
export const LOAD_PUBLIC_USER_DATA = 'LOAD_PUBLIC_USER_DATA';
export const LOAD_PUBLIC_USER_NAME = 'LOAD_PUBLIC_USER_NAME';
export const LOAD_GLOBAL_VIDEO_LIST = 'LOAD_GLOBAL_VIDEO_LIST';

export const SET_IMMEDIATE_OFF = 'SET_IMMEDIATE_OFF';
export const SET_IMMEDIATE_ON = 'SET_IMMEDIATE_ON';

export const SET_RECORDER = 'SET_RECORDER';

export const WEB_SOCKET_UPDATE = 'WEB_SOCKET_UPDATE';

export const SAVE_PIC_SUCCESS = 'SAVE_PIC_SUCCESS';
export const SAVE_PIC_FAILURE = 'SAVE_PIC_FAILURE';

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

export const setRifferName = (newName, googleUser) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: `/set-name`,
      data: { token: googleUser.getAuthResponse().id_token, newName },
    }).then((res) => {
      dispatch({ type: RECEIVE_NAME_UPDATE, payload: res.data });
    }).catch(err => console.log("error", err));
  };
};

export const setRiffPic = (payload, googleUser) => {
  return (dispatch) => {
    let fd = new FormData();
    fd.append('token', googleUser.getAuthResponse().id_token);
    fd.append('image', payload);
    axios({
      method: 'post',
      url: `/save-pic`,
      data: fd,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        // res.data.data
        dispatch({ type: SAVE_PIC_SUCCESS, payload: res.data }); // fix these to constants
      })
      .catch((err) => {
        dispatch({ type: SAVE_PIC_FAILURE, payload: err.response });
      });
  };
};

export const getRiffs = (videoID, googleUser) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: `/get-riffs`,
      data: { token: googleUser.getAuthResponse().id_token, videoID },
    }).then((res) => {
      dispatch({ type: RECEIVE_RIFF_LIST, payload: res.data });
    }).catch(err => console.log("error", err));

    axios({
      method: 'get',
      url: `/get-view-riffs/${videoID}`,
    }).then((res) => {
      dispatch({ type: RECEIVE_RIFF_META, payload: res.data });
    }).catch(err => console.log("error", err));
  }
};

export const setVideoID = (videoID, googleUser) => {
  return (dispatch) => {
    dispatch({
      type: SET_VIDEO_ID,
      payload: videoID,
    });
    axios({
      method: 'get',
      url: `/get-view-riffs/${videoID}`,
    }).then((res) => {
      dispatch({ type: RECEIVE_RIFF_META, payload: res.data });
    }).catch(error => {
      dispatch({ type: RECEIVE_RIFF_META, payload: { body: [] } });
    });
    if (googleUser && googleUser.getAuthResponse) {
      axios({
        method: 'post',
        url: `/get-riffs`,
        data: { token: googleUser.getAuthResponse().id_token, videoID },
      }).then((res) => {
        dispatch({ type: RECEIVE_RIFF_LIST, payload: res.data });
      }).catch(error => {
        console.error(error);
      });
    }
  };
};

//Delete Riff
export const deleteRiff = (riffID, googleUser, video_id, websocket) => {
  return (dispatch) => {
    axios({
      method: 'delete',
      url: `/riff-remove/${riffID}`,
      data: {
        token: googleUser.getAuthResponse().id_token,
      },
    }).then((res) => {
      dispatch({ type: DELETE_RIFF, id: riffID });

      // websocket call
      websocket.send(JSON.stringify({ type: 'update', video_id }));
    }).catch(err => console.log("error", err));
  };
};

// perhaps this action should somehow call the above action (setVideoID)?

// this shit really needs to be decoupled
export const setGoogleUser = (googleUser) => {
  return (dispatch) => {
    dispatch({
      type: GOOGLE_USER_SIGNIN,
      payload: googleUser,
    });
  };
};

// perhaps this action should somehow call the above action (setVideoID)?
export const googleUserLogout = () => ({
  type: GOOGLE_USER_SIGNIN,
  payload: null,
});

export const getRiffsMeta = (videoID) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `/get-view-riffs/${videoID}`,
    }).then((res) => {
      dispatch({ type: RECEIVE_RIFF_META, payload: res.data });
    }).catch(err => console.log("error", err));
  };
};

export const getViewRiffs = (videoID) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `/get-view-riffs/${videoID}`,
    }).then((res) => {
      dispatch({ type: RECEIVE_RIFF_LIST, payload: res.data });
    }).catch(err => console.log("error", err));
  };
};

export const getUserData = (googleUser) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `/get-user-data/${googleUser.getAuthResponse().id_token}`,
    }).then((res) => {
      dispatch({ type: LOAD_USER_DATA, payload: res.data });
    }).catch(err => console.log("error", err));
  };
};

export const getPublicUserData = (id) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `/get-user-data-by-id/${id}`,
    }).then((res) => {
      dispatch({ type: LOAD_PUBLIC_USER_DATA, payload: res.data });
    }).catch(err => console.log("error", err));
  };
};

export const getGlobalVideoList = () => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: '/get-global-video-list',
    }).then((res) => {
      dispatch({ type: LOAD_GLOBAL_VIDEO_LIST, payload: res.data });
    }).catch(err => console.log("error", err));
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

export const editRiff = (payload, id, load) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_RIFF,
      payload, // index
      id,
    });

    // id is only passed when the audio riff needs loading
    if (load) rawLoadAxios(dispatch, id); // loads riff audio
  };
};

export const cancelEdit = () => ({
  type: CANCEL_EDIT,
});

export const updateRiffTime = (token, start_time, video_id, riff_id, websocket) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: `/update-riff-time`,
      data: { token, start_time, id: riff_id },
    })
      .then((res) => {
        // res.data.data
        dispatch({ type: UPDATE_RIFF_TIME_SUCCESS, id: riff_id, time: start_time });
        // websocket call
        websocket.send(
          JSON.stringify({ type: 'update', video_id: video_id })
        );
      })
      .catch((err) => {
        dispatch({ type: SAVE_RIFF_FAILURE, payload: err.response });
      });

    // dispatch NOTHING
  };
}

export const saveRiff = (token, payload, riff, websocket) => {
  return (dispatch) => {
    let fd = new FormData();
    fd.append('token', token);
    fd.append(riff.type === 'text' ? 'text' : 'blob', payload.payload);
    fd.append('type', riff.type);
    fd.append(
      'duration',
      riff.type === 'text' ? payload.duration : riff.duration // how can this be right? (I should just relax)
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

    // dispatch local save command (clears temp audio)
    dispatch({ type: SAVE_RIFF, payload, riff });
  };
};

export const createTempRiff = (type, videoID, immediateRecord = false) => ({
  type: type === 'audio' ? CREATE_TEMP_AUDIO_RIFF : CREATE_TEMP_TEXT_RIFF,
  videoID,
  immediateRecord,
});

export const setImmediateOn = () => ({
  type: SET_IMMEDIATE_ON,
});

export const setImmediateOff = () => ({
  type: SET_IMMEDIATE_OFF,
});

export const setRecorder = (payload) => ({
  type: SET_RECORDER,
  payload,
});

export const setRiffPlaying = (index, playing) => ({
  type: playing ? SET_RIFF_PLAYING : SET_RIFF_NOT_PLAYING,
  payload: index,
});

export const loadRiff = (id, load) => {
  return (dispatch) => {
    dispatch({ type: LOAD_RIFF, payload: id });
    rawLoadAxios(dispatch, id);
  };
};

const rawLoadAxios = (dispatch, id) => {
  axios({
    method: 'get',
    url: `/load-riff/${id}`,
    responseType: 'arraybuffer',
  }).then((res) => {
    dispatch({ type: RIFF_LOADED, payload: res.data, id });
  }).catch(err => console.log("error", err));
};
