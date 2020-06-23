import {
  SET_VIDEO_ID,
  SET_RIFF_NOT_PLAYING,
  SET_RIFF_PLAYING,
} from '../actions/index.js';

const riffsPlayingReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_VIDEO_ID:
      return {};
    case SET_RIFF_PLAYING:
    case SET_RIFF_NOT_PLAYING:
      return {
        ...state,
        [action.payload]: action.type === SET_RIFF_PLAYING ? true : false,
      };
    default:
      return state;
  }
};

export default riffsPlayingReducer;
