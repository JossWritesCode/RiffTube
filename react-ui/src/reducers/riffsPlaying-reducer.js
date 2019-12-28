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
  SAVE_RIFF_SUCCESS,
  TOGGLE_VIEW_USERID_MUTED,
  RECEIVE_NAME_UPDATE
} from '../actions/index.js';

const riffsPlayingReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_VIDEO_ID:
      return {};
    case SET_RIFF_PLAYING:
    case SET_RIFF_NOT_PLAYING:
      return {
          ...state.riffsPlaying,
          [action.payload]: action.type === SET_RIFF_PLAYING ? true : false
        };
    default:
      return state;
  }
}

export default riffsPlayingReducer;