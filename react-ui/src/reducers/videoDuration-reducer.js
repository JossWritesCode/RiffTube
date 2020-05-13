import { RECEIVE_RIFF_LIST, SAVE_RIFF_SUCCESS } from '../actions/index.js';

const videoDurationReducer = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_RIFF_LIST:
    case SAVE_RIFF_SUCCESS: // this needs testing
      console.log( "video duration reducer", action);
      return action.payload.duration;
    default:
      return state;
  }
};

export default videoDurationReducer;
