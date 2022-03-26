import { GOOGLE_USER_SIGNIN } from '../actions/index.js';

// this file.. not used?

const googleTokenReducer = (state = null, action) => {
  switch (action.type) {
    case GOOGLE_USER_SIGNIN:
      const token = action.payload.getAuthResponse().id_token;
      localStorage.setItem('token', token);
      return token;
    default:
      return state;
  }
};

export default googleTokenReducer;
