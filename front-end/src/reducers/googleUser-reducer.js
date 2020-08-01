import { GOOGLE_USER_SIGNIN } from '../actions/index.js';

const googleUserReducer = (state = null, action) => {
  switch (action.type) {
    case GOOGLE_USER_SIGNIN:
      console.log(action.payload, 'action.payload');
      localStorage.setItem('token', action.payload.wc.id_token);
      return action.payload;
    default:
      return state;
  }
};

export default googleUserReducer;
