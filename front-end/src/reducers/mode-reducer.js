import {
  SET_VIDEO_ID,
  CREATE_TEMP_AUDIO_RIFF,
  CREATE_TEMP_TEXT_RIFF,
  EDIT_RIFF,
  EDIT_MODE,
  CANCEL_EDIT,
  SAVE_RIFF,
  SET_PLAYER_MODE,
  PLAY_MODE,
  PAUSE_MODE,
  TOGGLE_PLAYER_MODE,
} from '../actions/index.js';

const modeReducer = (state = PAUSE_MODE, action) => {
  switch (action.type) {
    case SET_VIDEO_ID:
      return PAUSE_MODE;
    case CREATE_TEMP_AUDIO_RIFF:
    case CREATE_TEMP_TEXT_RIFF:
    case EDIT_RIFF:
      return EDIT_MODE;
    case SET_PLAYER_MODE:
      return action.payload;
    case CANCEL_EDIT:
      return PAUSE_MODE;
    case TOGGLE_PLAYER_MODE: // not needed at the moment
      return state === PLAY_MODE ? PAUSE_MODE : PLAY_MODE;
    case SAVE_RIFF:
      return PAUSE_MODE; // should be an option
    default:
      return state;
  }
};

export default modeReducer;
