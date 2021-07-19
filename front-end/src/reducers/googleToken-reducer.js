import { GOOGLE_USER_SIGNIN } from '../actions/index.js';

const googleTokenReducer = (state = null, action) => {
  switch (action.type) {
    case GOOGLE_USER_SIGNIN:
      console.log(action.payload, 'action.payload');
      let token = action.payload.getAuthResponse().id_token;
      localStorage.setItem('token', token);
      return token;
    default:
      return state;
  }
};

export default googleTokenReducer;
