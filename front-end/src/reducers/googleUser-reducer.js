import { GOOGLE_USER_SIGNIN } from '../actions/index.js';

const googleUserReducer = (state = null, action) => {
  switch (action.type) {
    case GOOGLE_USER_SIGNIN:
      return action.payload;
    default:
      return state;
  }
};

export default googleUserReducer;
