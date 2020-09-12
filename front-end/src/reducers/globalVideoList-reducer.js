import { LOAD_GLOBAL_VIDEO_LIST } from '../actions/index.js';

const globalVideoListReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_GLOBAL_VIDEO_LIST:
        console.log( "load video list", action.payload );
      return action.payload.body;

    default:
      return state;
  }
};

export default globalVideoListReducer;
