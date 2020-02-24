import { RECEIVE_RIFF_LIST } from '../actions/index.js';

const videoDurationReducer = (state = undefined, action) => {
  switch (action.type) {
    case RECEIVE_RIFF_LIST:
    case RECEIVE_RIFF_META:
      return action.duration;
    default:
      return state;
  }
};

export default videoDurationReducer;
