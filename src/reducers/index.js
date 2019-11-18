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
  EDIT_MODE,
  EDIT_NEW_MODE,
  PLAY_MODE,
  PAUSE_MODE,
  TOGGLE_PLAYER_MODE
} from '../actions/index.js';

let initialState = {
  videoID: '8N_tupPBtWQ',
  googleUser: null,
  riffs: [],
  tempRiff: null,
  mode: PAUSE_MODE,
  riffsPlaying: {}
};

export default (state = initialState, action) => {
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
      return {
        ...state,
        tempRiff: {
          type: 'audio',
          time: window.rifftubePlayer.getCurrentTime()
        },
        mode: EDIT_NEW_MODE
      };
    case CREATE_TEMP_TEXT_RIFF:
      return {
        ...state,
        tempRiff: {
          type: 'text',
          time: window.rifftubePlayer.getCurrentTime(),
          video_id: state.videoID
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
    case TOGGLE_PLAYER_MODE:
      return {
        ...state,
        mode: state.mode === PLAY_MODE ? PAUSE_MODE : PLAY_MODE
      };
    case SAVE_RIFF:
      let riff = { ...state.tempRiff, ...action.payload };
      let riffs;
      if (state.mode === EDIT_NEW_MODE) riffs = [...state.riffs, riff];
      // EDIT_MODE
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
    default:
      console.log('uncaught action!');
      return state;
  }
};
