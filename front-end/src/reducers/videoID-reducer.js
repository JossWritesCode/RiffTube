import { SET_VIDEO_ID } from '../actions/index.js';

const videoIDReducer = (state = 'zZvmWtx_pfU', action) => {
  switch (action.type) {
    case SET_VIDEO_ID:
      console.log("vid reducer", state, action);
      return action.payload;

    default:
      return state;
  }
};

export default videoIDReducer;
