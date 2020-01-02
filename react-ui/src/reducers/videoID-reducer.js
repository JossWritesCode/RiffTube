import {
  SET_VIDEO_ID
} from '../actions/index.js';

const videoIDReducer = (state = "Oqaz7U37hrE", action) => {
  switch (action.type) {
    case SET_VIDEO_ID:
      return action.payload;
    default:
      return state;
  }
};

export default videoIDReducer;