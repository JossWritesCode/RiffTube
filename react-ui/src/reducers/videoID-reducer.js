
import {
  SET_VIDEO_ID
} from '../actions/index.js';

const videoIDReducer = (state = "lYIRO97dhII", action) => {
  console.log('dispatch', state, action);
  switch (action.type) {
    case SET_VIDEO_ID:
      return action.payload;
    default:
      return state;
  }
};

export default videoIDReducer;