import { RECEIVE_RIFF_LIST } from '../actions/index.js';

const videoDurationReducer = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_RIFF_LIST:
      console.log( "video duration reducer", action);
      return action.payload.duration;
    default:
      return state;
  }
};

export default videoDurationReducer;
