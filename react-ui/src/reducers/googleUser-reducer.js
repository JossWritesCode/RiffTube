import {
  GOOGLE_USER_SIGNIN
} from '../actions/index.js';

export const riffReducer = (state = null, action) => {
  switch (action.type) {
    case GOOGLE_USER_SIGNIN:
      return action.payload;
    default:
      return state;
  }
};