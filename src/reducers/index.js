import {
  SET_VIDEO_ID,
  GOOGLE_USER_SIGNIN,
  SAVE_RIFF,
  CREATE_TEMP_AUDIO_RIFF,
  CREATE_TEMP_TEXT_RIFF,
  SET_PLAYER_MODE,
  SAVE_TEMP_AUDIO,
  CANCEL_EDIT,
  EDIT_RIFF,
  SET_RIFF_NOT_PLAYING,
  SET_RIFF_PLAYING,
  LOAD_RIFF,
  RIFF_LOADED,
  EDIT_MODE,
  EDIT_NEW_MODE,
  PLAY_MODE,
  PAUSE_MODE,
  TOGGLE_PLAYER_MODE,
  RECEIVE_RIFF_LIST,
  SAVE_RIFF_SUCCESS
} from '../actions/index.js';

let initialState = {
  videoID: 'lYIRO97dhII',
  googleUser: null,
  riffs: [],
  tempRiff: null,
  mode: PAUSE_MODE,
  riffsPlaying: {}
};

export default (state = initialState, action) => {
  console.log('dispatch', action, state);

  switch (action.type) {
    case SET_VIDEO_ID:
      return {
        videoID: action.payload,
        googleUser: state.googleUser,
        riffs: [],
        tempRiff: null,
        mode: PAUSE_MODE,
        riffsPlaying: {}
      };
    case GOOGLE_USER_SIGNIN:
      return {
        ...state,
        googleUser: action.payload
      };
    case CREATE_TEMP_AUDIO_RIFF:
    case CREATE_TEMP_TEXT_RIFF:
      return {
        ...state,
        tempRiff: {
          type: action.type === CREATE_TEMP_AUDIO_RIFF ? 'audio' : 'text',
          time: window.rifftubePlayer.getCurrentTime(),
          video_id: state.videoID,
          tempId: new Date().getUTCMilliseconds() // used to get perm id from server
        },
        mode: EDIT_NEW_MODE
      };

    case EDIT_RIFF:
      return {
        ...state,
        tempRiff: { ...state.riffs[action.payload] }, // copy specified riff to tempRiff
        editIndex: action.payload,
        mode: EDIT_MODE
      };
    case SET_PLAYER_MODE:
      return {
        ...state,
        mode: action.payload
      };
    case SAVE_TEMP_AUDIO:
      return {
        ...state,
        tempRiff: {
          ...state.tempRiff,
          duration: action.duration,
          payload: action.payload
        }
      };
    case CANCEL_EDIT:
      return {
        ...state,
        tempRiff: null,
        editIndex: null,
        mode: PAUSE_MODE
      };
    case SET_RIFF_PLAYING:
      return {
        ...state,
        riffsPlaying: {
          ...state.riffsPlaying,
          [action.payload]: true
        }
      };
    case SET_RIFF_NOT_PLAYING:
      return {
        ...state,
        riffsPlaying: {
          ...state.riffsPlaying,
          [action.payload]: false
        }
      };
    case TOGGLE_PLAYER_MODE: // not needed at the moment
      return {
        ...state,
        mode: state.mode === PLAY_MODE ? PAUSE_MODE : PLAY_MODE
      };
    case RECEIVE_RIFF_LIST:
      return {
        ...state,
        riffs: [
          ...state.riffs,
          ...action.payload.body.map(el => ({
            ...el,
            time: el.start_time,
            payload: el.isText ? el.text : null,
            type: el.isText ? 'text' : 'audio'
          }))
        ]
      };
    case SAVE_RIFF_SUCCESS:
      if (action.payload.type === 'add') {
        let riffs = [...state.riffs];
        riffs.forEach(el => {
          if (el.tempId === action.payload.tempId) el.id = action.payload.id;
        });
        let ret = { ...state, riffs };
        return ret;
      } else return state;
    case SAVE_RIFF: {
      let riff = { ...state.tempRiff, ...action.payload };
      let riffs;
      // editing a new riff:
      if (state.mode === EDIT_NEW_MODE) riffs = [...state.riffs, riff];
      // EDIT_MODE (existing riff):
      else {
        riffs = [...state.riffs];
        riffs[state.editIndex] = riff;
      }

      return {
        ...state,
        riffs,
        tempRiff: null,
        mode: PLAY_MODE // should be an option
      };
    }
    case LOAD_RIFF:
      let ret = { ...state };
      ret.riffs[action.payload].loading = true;
      return ret;
    case RIFF_LOADED: {
      const b = new Blob(new Array(action.payload), { type: 'audio/webm' });
      let riffs = [...state.riffs];
      riffs.forEach(el => {
        if (el.id === action.id) {
          el.payload = b;
          el.loading = false;
        }
      });
      let ret = { ...state, riffs };

      // if this is being edited currently, tempRiff needs to be updated as well
      if (state.mode === EDIT_MODE && state.tempRiff.id === action.id)
        ret.tempRiff = { ...ret.tempRiff, payload: b };

      return ret;
    }
    default:
      console.log('uncaught action!');
      return state;
  }
};
