import { SET_VIDEO_DURATION } from '../actions/index.js';

const videoDurationReducer = (state = null, action) => {
  switch (action.type) {
    case SET_VIDEO_DURATION:
      return action.payload;
    default:
      return state;
  }
};

export default videoDurationReducer;
